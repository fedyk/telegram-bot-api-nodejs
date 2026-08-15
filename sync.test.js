import { describe, it } from "node:test";
import { deepEqual, equal, match, rejects } from "node:assert/strict";
import { TELEGRAM_BOT_API_URL, generateIndexSource, generateMethods, generateTypes, normalizeType, parseBotApiHtml, parseFieldTable, parseSections, sync, toTypeScriptType, } from "./sync.js";
const fixture = `
<h4><a class="anchor" name="messageentity" href="#messageentity"><i class="anchor-icon"></i></a>MessageEntity</h4>
<p>This object represents one special entity in a text message.</p>
<table>
<thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
<tbody>
<tr><td>type</td><td>String</td><td>Type of the entity. Currently, can be “mention”, “custom_emoji”, or “date_time”.</td></tr>
<tr><td>offset</td><td>Integer</td><td>Offset in UTF-16 code units to the start of the entity</td></tr>
<tr><td>length</td><td>Integer</td><td>Length in UTF-16 code units</td></tr>
<tr><td>url</td><td>String</td><td><em>Optional</em>. For “text_link” only, URL.</td></tr>
<tr><td>unix_time</td><td>Integer</td><td><em>Optional</em>. For “date_time” only, the Unix time.</td></tr>
</tbody>
</table>

<h4><a class="anchor" name="paidmedia" href="#paidmedia"><i class="anchor-icon"></i></a>PaidMedia</h4>
<p>This object describes paid media. Currently, it can be one of</p>
<ul><li><a href="#paidmedialivephoto">PaidMediaLivePhoto</a></li><li><a href="#paidmediaphoto">PaidMediaPhoto</a></li></ul>

<h4><a class="anchor" name="paidmedialivephoto" href="#paidmedialivephoto"><i class="anchor-icon"></i></a>PaidMediaLivePhoto</h4>
<table><tbody>
<tr><td>type</td><td>String</td><td>Type of the paid media, always “live_photo”</td></tr>
<tr><td>live_photo</td><td>LivePhoto</td><td>The live photo</td></tr>
</tbody></table>

<h4><a class="anchor" name="inputmedia" href="#inputmedia"><i class="anchor-icon"></i></a>InputMedia</h4>
<p>This object represents the content of a media message to be sent. It should be one of</p>
<ul><li><a href="#inputmediaanimation">InputMediaAnimation</a></li><li><a href="#inputmedialivephoto">InputMediaLivePhoto</a></li></ul>

<h4><a class="anchor" name="inputmedialivephoto" href="#inputmedialivephoto"><i class="anchor-icon"></i></a>InputMediaLivePhoto</h4>
<table><tbody>
<tr><td>type</td><td>String</td><td>Type of the media, must be live_photo</td></tr>
<tr><td>media</td><td>String</td><td>Video of the live photo to send.</td></tr>
<tr><td>photo</td><td>String</td><td>The static photo to send.</td></tr>
<tr><td>caption_entities</td><td>Array of MessageEntity</td><td><em>Optional</em>. List of special entities.</td></tr>
</tbody></table>

<h4><a class="anchor" name="sendPhoto" href="#sendphoto"><i class="anchor-icon"></i></a>sendPhoto</h4>
<p>Use this method to send photos. On success, the sent Message is returned.</p>
<table><tbody>
<tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
<tr><td>chat_id</td><td>Integer or String</td><td>Yes</td><td>Unique identifier for the target chat</td></tr>
<tr><td>photo</td><td>InputFile or String</td><td>Yes</td><td>Photo to send</td></tr>
<tr><td>caption</td><td>String</td><td>No</td><td>Photo caption</td></tr>
</tbody></table>

<h4><a class="anchor" name="getMe" href="#getme"><i class="anchor-icon"></i></a>getMe</h4>
<p>Use this method to get basic information about the bot. Returns User on success.</p>
<table><tbody>
<tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
</tbody></table>

<h4><a class="anchor" name="forwardMessages" href="#forwardmessages"><i class="anchor-icon"></i></a>forwardMessages</h4>
<p>Use this method to forward messages. On success, an Array of MessageId of the sent messages is returned.</p>
<table><tbody>
<tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
<tr><td>chat_id</td><td>Integer or String</td><td>Yes</td><td>Unique identifier for the target chat</td></tr>
</tbody></table>
`;
describe(parseSections.name, function () {
    it("extracts section names, anchors, text and field tables", function () {
        const sections = parseSections(fixture);
        equal(sections[0].name, "MessageEntity");
        equal(sections[0].anchor, "messageentity");
        equal(sections[0].fields.length, 5);
        equal(sections[0].text.includes("Currently, can be \"mention\""), true);
    });
});
describe(parseFieldTable.name, function () {
    it("parses object tables and detects fields", function () {
        const fields = parseFieldTable(fixture);
        deepEqual(fields.slice(0, 3).map(function (field) {
            return field.name;
        }), ["type", "offset", "length"]);
        equal(fields[0].type, "String");
        equal(fields[3].description.startsWith("Optional"), true);
    });
    it("parses method parameter tables and required flags", function () {
        const section = parseSections(fixture).find(function (section) {
            return section.name === "sendPhoto";
        });
        deepEqual(section?.fields.map(function (field) {
            return [field.name, field.required];
        }), [
            ["chat_id", true],
            ["photo", true],
            ["caption", false],
        ]);
    });
});
describe(normalizeType.name, function () {
    it("maps Telegram scalar and array type names to TypeScript", function () {
        equal(normalizeType("String"), "string");
        equal(normalizeType("Integer or String"), "number | string");
        equal(normalizeType("Array of MessageEntity"), "MessageEntity[]");
        equal(normalizeType("Array of Array of PhotoSize"), "PhotoSize[][]");
        equal(normalizeType("Array of InputMediaAudio, InputMediaDocument and InputMediaVideo"), "Array<InputMediaAudio | InputMediaDocument | InputMediaVideo>");
        equal(normalizeType("InputFile or String"), "InputFile | string");
        equal(normalizeType("True"), "boolean");
    });
});
describe(toTypeScriptType.name, function () {
    it("uses quoted docs values as string-literal unions for string fields", function () {
        const field = {
            name: "currency",
            type: "String",
            description: "Currently, must be one of \"XTR\" or \"TON\".",
        };
        equal(toTypeScriptType(field), "\"XTR\" | \"TON\"");
    });
});
describe(generateTypes.name, function () {
    it("generates interfaces with optional fields and literal discriminator fields", function () {
        const types = generateTypes(parseSections(fixture));
        const messageEntity = types.find(function (type) {
            return type.name === "MessageEntity";
        });
        const livePhoto = types.find(function (type) {
            return type.name === "InputMediaLivePhoto";
        });
        match(messageEntity?.source ?? "", /type: "mention" \| "custom_emoji" \| "date_time"/);
        match(messageEntity?.source ?? "", /url\?: string/);
        match(messageEntity?.source ?? "", /unix_time\?: number/);
        match(livePhoto?.source ?? "", /type: "live_photo"/);
        match(livePhoto?.source ?? "", /caption_entities\?: MessageEntity\[\]/);
    });
    it("generates union types for Telegram one-of sections", function () {
        const types = generateTypes(parseSections(fixture));
        const paidMedia = types.find(function (type) {
            return type.name === "PaidMedia";
        });
        const inputMedia = types.find(function (type) {
            return type.name === "InputMedia";
        });
        equal(paidMedia?.source.includes("PaidMediaLivePhoto"), true);
        equal(paidMedia?.source.includes("PaidMediaPhoto"), true);
        equal(inputMedia?.source.includes("InputMediaLivePhoto"), true);
    });
});
describe(generateMethods.name, function () {
    it("generates JSON API methods for regular methods", function () {
        const getMe = generateMethods(parseSections(fixture)).find(function (method) {
            return method.name === "getMe";
        });
        const forwardMessages = generateMethods(parseSections(fixture)).find(function (method) {
            return method.name === "forwardMessages";
        });
        equal(getMe?.returnType, "User");
        equal(getMe?.hasUpload, false);
        match(getMe?.source.join("\n") ?? "", /JSON\.stringify\(payload\)/);
        match(getMe?.source.join("\n") ?? "", /parseResponse<User>/);
        equal(forwardMessages?.returnType, "MessageId[]");
    });
    it("generates FormData-aware methods for upload methods", function () {
        const sendPhoto = generateMethods(parseSections(fixture)).find(function (method) {
            return method.name === "sendPhoto";
        });
        equal(sendPhoto?.returnType, "Message");
        equal(sendPhoto?.hasUpload, true);
        match(sendPhoto?.source.join("\n") ?? "", /payload: SendPhotoOptions \| FormData/);
        match(sendPhoto?.source.join("\n") ?? "", /prepareFormBody\(payload\)/);
        match(sendPhoto?.source.join("\n") ?? "", /photo: InputFile \| string/);
        match(sendPhoto?.source.join("\n") ?? "", /caption\?: string/);
    });
});
describe(generateIndexSource.name, function () {
    it("renders types before methods and helpers", function () {
        const source = generateIndexSource(parseBotApiHtml(fixture));
        equal(source.includes("export type InputFile = Blob | string"), true);
        equal(source.indexOf("* Types") < source.indexOf("* Methods"), true);
        equal(source.indexOf("* Methods") < source.indexOf("* Helpers"), true);
        match(source, /export function sendPhoto/);
        match(source, /export function parseResponse/);
    });
});
describe(sync.name, function () {
    it("fetches the Telegram Bot API URL and writes generated index2.ts content", async function () {
        let requestedUrl = "";
        let writtenPath = "";
        let writtenData = "";
        const source = await sync({
            fetchImpl: async function (url) {
                requestedUrl = url;
                return {
                    ok: true,
                    status: 200,
                    statusText: "OK",
                    async text() {
                        return fixture;
                    },
                };
            },
            writeFileImpl: async function (path, data) {
                writtenPath = path;
                writtenData = data;
            },
        });
        equal(requestedUrl, TELEGRAM_BOT_API_URL);
        equal(writtenPath, "index2.ts");
        equal(source, writtenData);
        match(writtenData, /export type PaidMedia = PaidMediaLivePhoto/);
    });
    it("throws when the docs request fails", async function () {
        await rejects(sync({
            fetchImpl: async function () {
                return {
                    ok: false,
                    status: 503,
                    statusText: "Service Unavailable",
                    async text() {
                        return "";
                    },
                };
            },
            writeFileImpl: async function () { },
        }), /Failed to fetch/);
    });
});
