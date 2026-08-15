export declare const TELEGRAM_BOT_API_URL = "https://core.telegram.org/bots/api";
type FetchLike = (url: string) => Promise<{
    ok: boolean;
    status: number;
    statusText: string;
    text(): Promise<string>;
}>;
export interface SyncOptions {
    url?: string;
    outputPath?: string;
    fetchImpl?: FetchLike;
    writeFileImpl?: (path: string, data: string) => Promise<void>;
}
export interface DocSection {
    name: string;
    anchor: string;
    html: string;
    text: string;
    fields: DocField[];
}
export interface DocField {
    name: string;
    type: string;
    required?: boolean;
    description: string;
}
export interface ApiModel {
    sections: DocSection[];
    types: GeneratedType[];
    methods: GeneratedMethod[];
}
export interface GeneratedType {
    kind: "interface" | "union" | "alias";
    name: string;
    source: string;
}
export interface GeneratedMethod {
    name: string;
    optionsName: string;
    returnType: string;
    fields: DocField[];
    hasUpload: boolean;
    source: string[];
}
export declare function sync(options?: SyncOptions): Promise<string>;
export declare function parseBotApiHtml(html: string): ApiModel;
export declare function generateIndexSource(model: ApiModel): string;
export declare function parseSections(html: string): DocSection[];
export declare function parseFieldTable(sectionHtml: string): DocField[];
export declare function generateTypes(sections: DocSection[]): GeneratedType[];
export declare function generateMethods(sections: DocSection[]): GeneratedMethod[];
export declare function toTypeScriptType(field: Pick<DocField, "type" | "description">): string;
export declare function normalizeType(type: string): string;
export {};
