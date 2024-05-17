export type ChatType = "private"
  | "group"
  | "supergroup"
  | "channel";

export type ChatAction = "typing"
  | "upload_photo"
  | "record_video"
  | "upload_video"
  | "record_audio"
  | "upload_audio"
  | "upload_document"
  | "find_location"
  | "record_video_note"
  | "upload_video_note";

export type ChatMemberStatus = "creator"
  | "administrator"
  | "member"
  | "restricted"
  | "left"
  | "kicked";

export type DocumentMimeType = "application/pdf" | "application/zip";

export type MessageType =
  | "text"
  | "animation"
  | "audio"
  | "channel_chat_created"
  | "contact"
  | "delete_chat_photo"
  | "document"
  | "game"
  | "group_chat_created"
  | "invoice"
  | "left_chat_member"
  | "location"
  | "migrate_from_chat_id"
  | "migrate_to_chat_id"
  | "new_chat_members"
  | "new_chat_photo"
  | "new_chat_title"
  | "passport_data"
  | "photo"
  | "pinned_message"
  | "sticker"
  | "successful_payment"
  | "supergroup_chat_created"
  | "video"
  | "video_note"
  | "voice";

type MessageEntityType = "mention"
  | "hashtag"
  | "bot_command"
  | "url"
  | "email"
  | "bold"
  | "italic"
  | "code"
  | "pre"
  | "text_link"
  | "text_mention"

type ParseMode = "Markdown"
  | "MarkdownV2"
  | "HTML";

export type AllowedUpdates = keyof (Omit<Update, "update_id">)

export interface SetWebHookOptions {
  url: string;
  max_connections?: number;
  allowed_updates?: AllowedUpdates[]
}

interface SendBasicOptions {
  chat_id: number | string
  message_thread_id?: number
  disable_notification?: boolean;
  reply_to_message_id?: number | string;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendMessageOptions extends SendBasicOptions {
  text: string
  parse_mode?: ParseMode;
  disable_web_page_preview?: boolean;
  entities?: MessageEntity[]
}

interface SendAnimationOptions extends SendBasicOptions {
  animation: string
  parse_mode?: ParseMode;
  caption?: string;
}

interface SendDocumentOptions extends SendBasicOptions {
  document: string
  parse_mode?: ParseMode;
  caption?: string;
}

interface SendMediaGroupOptions extends SendBasicOptions {
  media: Array<InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo>
}

interface SendInvoiceOptions extends SendBasicOptions {
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  is_flexible?: boolean;
}

interface RestrictChatMemberOptions {
  until_date?: number;
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
}

interface PromoteChatMemberOptions {
  can_change_info?: boolean
  can_post_messages?: boolean
  can_edit_messages?: boolean
  can_delete_messages?: boolean
  can_invite_users?: boolean
  can_restrict_members?: boolean
  can_pin_messages?: boolean
  can_promote_members?: boolean
}

export interface AnswerCallbackQueryOptions {
  callback_query_id: string
  text?: string
  show_alert?: boolean
  url?: string
  cache_time?: number
}

interface SetMyCommandsOptions {
  commands: BotCommand[]
  scope: BotCommandScope
  language_code: string | undefined
}

interface GetMyCommandsOptions {
  scope?: BotCommandScope
  language_code?: string
}

interface DeleteMyCommandsOptions { }

interface EditMessageTextOptions extends EditMessageReplyMarkupOptions {
  parse_mode?: ParseMode;
  disable_web_page_preview?: boolean;
  text: string
}

interface EditMessageCaptionOptions extends EditMessageReplyMarkupOptions {
  reply_markup?: InlineKeyboardMarkup;
}

interface EditMessageReplyMarkupOptions {
  chat_id?: number | string;
  message_id?: number | string;
  inline_message_id?: string;
}

interface SetGameScoreOptions {
  force?: boolean;
  disable_edit_message?: boolean;
  chat_id?: number;
  message_id?: number;
  inline_message_id?: string;
}

interface GetGameHighScoresOptions {
  chat_id?: number;
  message_id?: number;
  inline_message_id?: string;
}

interface AnswerShippingQueryOptions {
  shipping_options?: ShippingOption[];
  error_message?: string;
}

interface AnswerPreCheckoutQueryOptions {
  error_message?: string;
}

/// TELEGRAM TYPES ///
interface PassportFile {
  file_id: string;
  file_size: number;
  file_date: number;
}

interface EncryptedPassportElement {
  type: string;
  data?: string;
  phone_number?: string;
  email?: string;
  files?: PassportFile[];
  front_side?: PassportFile;
  reverse_side?: PassportFile;
  selfie?: PassportFile;
  translation?: PassportFile[];
  hash: string;
}

interface EncryptedCredentials {
  data: string;
  hash: string;
  secret: string;
}

interface PassportData {
  data: EncryptedPassportElement[];
  credentials: EncryptedCredentials;
}

/**
 * @docs https://core.telegram.org/bots/api#update
 */
export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message
  message_reaction?: MessageReactionUpdated
  message_reaction_count?: MessageReactionCountUpdated
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
  shipping_query?: ShippingQuery;
  pre_checkout_query?: PreCheckoutQuery;
  my_chat_member?: ChatMemberUpdated

}

export interface WebhookInfo {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  last_error_date?: number;
  last_error_message?: string;
  max_connections?: number;
  allowed_updates?: AllowedUpdates[]
}

export interface User {
  id: string;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium: boolean
  can_join_groups?: boolean
  supports_inline_queries?: boolean
  can_read_all_group_messages?: boolean
}

export interface Chat {
  id: number;
  type: ChatType;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_forum?: boolean
  photo?: ChatPhoto;
  bio?: string
  description?: string;
  invite_link?: string;
  pinned_message?: Message;
  permissions?: ChatPermissions;
  can_set_sticker_set?: boolean;
  sticker_set_name?: string;
}

interface ForumTopicCreated {
  name: string;
  icon_color: number;
  icon_custom_emoji_id?: string;
}

interface ForumTopicEdited {
  name?: string;
  icon_custom_emoji_id?: string;
}

interface ForumTopicClosed { }

interface ForumTopicReopened { }

interface GeneralForumTopicHidden { }

interface GeneralForumTopicUnhidden { }

/**
 * @docs https://core.telegram.org/bots/api#message
 */
export interface Message {
  message_id: number;
  message_thread_id?: number;
  from?: User;
  date: number;
  chat: Chat;
  forward_from?: User;
  forward_from_chat?: Chat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  is_topic_message?: boolean
  is_automatic_forward?: boolean
  reply_to_message?: Message;
  edit_date?: number;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: MessageEntity[];
  caption_entities?: MessageEntity[];
  audio?: Audio;
  document?: Document;
  animation?: Animation;
  game?: Game;
  photo?: PhotoSize[];
  sticker?: Sticker;
  story?: Story;
  video?: Video;
  voice?: Voice;
  video_note?: VideoNote;
  caption?: string;
  contact?: Contact;
  location?: Location;
  venue?: Venue;
  poll?: Poll;
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: string;
  new_chat_photo?: PhotoSize[];
  delete_chat_photo?: boolean;
  group_chat_created?: boolean;
  supergroup_chat_created?: boolean;
  channel_chat_created?: boolean;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: Message;
  invoice?: Invoice;
  successful_payment?: SuccessfulPayment;
  connected_website?: string;
  passport_data?: PassportData;
  reply_markup?: InlineKeyboardMarkup;
  sender_chat?: Chat
  forum_topic_created?: ForumTopicCreated
  forum_topic_edited?: ForumTopicEdited
  forum_topic_closed?: ForumTopicClosed
  forum_topic_reopened?: ForumTopicReopened
  general_forum_topic_hidden?: GeneralForumTopicHidden
  general_forum_topic_unhidden?: GeneralForumTopicUnhidden
}

export interface MessageReactionUpdated {
  chat: Chat
  message_id: number
  user?: User
  actor_chat?: Chat
  date: number
  old_reaction: ReactionType[]
  new_reaction: ReactionType[]
}

/**
 * @see https://core.telegram.org/bots/api#reactiontype
 */
export type ReactionType = ReactionTypeEmoji
  | ReactionTypeCustomEmoji

/**
 * @see https://core.telegram.org/bots/api#reactiontypeemoji
 */
export interface ReactionTypeEmoji {
  type: "emoji"
  emoji: string
}

/**
 * @see https://core.telegram.org/bots/api#reactiontypecustomemoji
 */
export interface ReactionTypeCustomEmoji {
  type: "custom_emoji"
  custom_emoji_id: string
}

/**
 * @see https://core.telegram.org/bots/api#messagereactioncountupdated
 */
export interface MessageReactionCountUpdated {
  chat: Chat
  message_id: number
  date: number
  reactions: ReactionCount[]
}

/**
 * @see https://core.telegram.org/bots/api#reactioncount
 */
export interface ReactionCount {
  type: ReactionType
  total_count: number
}

export interface MessageEntity {
  type: MessageEntityType;
  offset: number;
  length: number;
  url?: string;
  user?: User;
}

interface FileBase {
  file_id: string;
  file_size?: number;
}

export interface PhotoSize extends FileBase {
  width: number;
  height: number;
  file_unique_id: string;
}

export interface Audio extends FileBase {
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  thumb?: PhotoSize;
}

export interface Document extends FileBase {
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Story  {
  chat: Chat;
  id: number
}

export interface Video extends FileBase {
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  mime_type?: string;
  file_name?: string;
}

export interface Voice extends FileBase {
  duration: number;
  mime_type?: string;
}

interface InputMediaBase {
  media: string;
  caption?: string;
  parse_mode?: ParseMode;
}

export interface InputMediaAudio extends InputMediaBase {
  type: "audio"
  media: string
  caption?: string
  parse_mode?: ParseMode;
  duration?: number
  performer?: string
  title?: string
}

export interface InputMediaDocument extends InputMediaBase {
  type: "document";
  media: string
  caption?: string
  parse_mode?: ParseMode;
}

export interface InputMediaPhoto extends InputMediaBase {
  type: "photo";
  media: string
  caption?: string
  parse_mode?: ParseMode;
}

export interface InputMediaVideo extends InputMediaBase {
  type: "video";
  caption?: string
  parse_mode?: ParseMode;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
}

export type InputMedia = InputMediaPhoto | InputMediaVideo | InputMediaDocument | InputMediaPhoto;

export interface VideoNote extends FileBase {
  length: number;
  duration: number;
  thumb?: PhotoSize;
}

export interface Contact {
  phone_number: string;
  first_name: string;
  last_name?: string;
  user_id?: number;
  vcard?: string;
}

export interface Location {
  longitude: number;
  latitude: number;
}

export interface Venue {
  location: Location;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
}

export interface PollOption {
  text: string;
  voter_count: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  is_closed: boolean;
}

export interface UserProfilePhotos {
  total_count: number;
  photos: PhotoSize[][];
}

export interface File extends FileBase {
  file_path?: string;
}

interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  selective?: boolean;
}

interface KeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
}

interface ReplyKeyboardRemove {
  remove_keyboard: boolean;
  selective?: boolean;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  login_url?: LoginUrl;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: CallbackGame;
  pay?: boolean;
}

interface LoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_acces?: boolean;
}

export interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
}

interface ForceReply {
  force_reply: boolean;
  selective?: boolean;
}

interface ChatPhoto {
  small_file_id: string
  small_file_unique_id: string
  big_file_id: string
  big_file_unique_id: string
}

interface ChatMember {
  user: User;
  status: ChatMemberStatus;
  until_date?: number;
  can_be_edited?: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_delete_messages?: boolean;
  can_restrict_members?: boolean;
  can_promote_members?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  is_member?: boolean;
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_polls: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
}

interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
}

export interface Sticker {
  file_id: string;
  width: number;
  height: number;
  thumbnail?: PhotoSize;
  /** @deprecated */
  thumb?: PhotoSize;
  emoji?: string;
  set_name?: string;
  mask_position?: MaskPosition;
  file_size?: number;
}

interface StickerSet {
  name: string;
  title: string;
  contains_masks: boolean;
  stickers: Sticker[];
}

interface MaskPosition {
  point: string;
  x_shift: number;
  y_shift: number;
  scale: number;
}

interface InlineQuery {
  id: string;
  from: User;
  location?: Location;
  query: string;
  offset: string;
}

interface InlineQueryResultBase {
  id: string;
  reply_markup?: InlineKeyboardMarkup;
}

interface InlineQueryResultArticle extends InlineQueryResultBase {
  type: "article";
  title: string;
  input_message_content: InputMessageContent;
  url?: string;
  hide_url?: boolean;
  description?: string;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

interface InlineQueryResultPhoto extends InlineQueryResultBase {
  type: "photo";
  photo_url: string;
  thumb_url: string;
  photo_width?: number;
  photo_height?: number;
  title?: string;
  description?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultGif extends InlineQueryResultBase {
  type: "gif";
  gif_url: string;
  gif_width?: number;
  gif_height?: number;
  gif_duration?: number;
  thumb_url?: string;
  title?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultMpeg4Gif extends InlineQueryResultBase {
  type: "mpeg4_gif";
  mpeg4_url: string;
  mpeg4_width?: number;
  mpeg4_height?: number;
  mpeg4_duration?: number;
  thumb_url?: string;
  title?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultVideo extends InlineQueryResultBase {
  type: "video";
  video_url: string;
  mime_type: string;
  thumb_url: string;
  title: string;
  caption?: string;
  video_width?: number;
  video_height?: number;
  video_duration?: number;
  description?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultAudio extends InlineQueryResultBase {
  type: "audio";
  audio_url: string;
  title: string;
  caption?: string;
  performer?: string;
  audio_duration?: number;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultVoice extends InlineQueryResultBase {
  type: "voice";
  voice_url: string;
  title: string;
  caption?: string;
  voice_duration?: number;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultDocument extends InlineQueryResultBase {
  type: "document";
  title: string;
  caption?: string;
  document_url: string;
  mime_type: string;
  description?: string;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

interface InlineQueryResultLocationBase extends InlineQueryResultBase {
  latitude: number;
  longitude: number;
  title: string;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

interface InlineQueryResultLocation extends InlineQueryResultLocationBase {
  type: "location";
}

interface InlineQueryResultVenue extends InlineQueryResultLocationBase {
  type: "venue";
  address: string;
  foursquare_id?: string;
}

interface InlineQueryResultContact extends InlineQueryResultBase {
  type: "contact";
  phone_number: string;
  first_name: string;
  last_name?: string;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

interface InlineQueryResultGame extends InlineQueryResultBase {
  type: "game";
  game_short_name: string;
}

interface InlineQueryResultCachedPhoto extends InlineQueryResultBase {
  type: "photo";
  photo_file_id: string;
  title?: string;
  description?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedGif extends InlineQueryResultBase {
  type: "gif";
  gif_file_id: string;
  title?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedMpeg4Gif extends InlineQueryResultBase {
  type: "mpeg4_gif";
  mpeg4_file_id: string;
  title?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedSticker extends InlineQueryResultBase {
  type: "sticker";
  sticker_file_id: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedDocument extends InlineQueryResultBase {
  type: "document";
  title: string;
  document_file_id: string;
  description?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedVideo extends InlineQueryResultBase {
  type: "video";
  video_file_id: string;
  title: string;
  description?: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedVoice extends InlineQueryResultBase {
  type: "voice";
  voice_file_id: string;
  title: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

interface InlineQueryResultCachedAudio extends InlineQueryResultBase {
  type: "audio";
  audio_file_id: string;
  caption?: string;
  input_message_content?: InputMessageContent;
}

type InlineQueryResult =
  InlineQueryResultCachedAudio |
  InlineQueryResultCachedDocument |
  InlineQueryResultCachedGif |
  InlineQueryResultCachedMpeg4Gif |
  InlineQueryResultCachedPhoto |
  InlineQueryResultCachedSticker |
  InlineQueryResultCachedVideo |
  InlineQueryResultCachedVoice |
  InlineQueryResultArticle |
  InlineQueryResultAudio |
  InlineQueryResultContact |
  InlineQueryResultGame |
  InlineQueryResultDocument |
  InlineQueryResultGif |
  InlineQueryResultLocation |
  InlineQueryResultMpeg4Gif |
  InlineQueryResultPhoto |
  InlineQueryResultVenue |
  InlineQueryResultVideo |
  InlineQueryResultVoice;

type InputMessageContent = object;

interface InputTextMessageContent extends InputMessageContent {
  message_text: string;
  parse_mode?: ParseMode;
  disable_web_page_preview?: boolean;
}

interface InputLocationMessageContent extends InputMessageContent {
  latitude: number;
  longitude: number;
}

interface InputVenueMessageContent extends InputLocationMessageContent {
  title: string;
  address: string;
  foursquare_id?: string;
}

interface InputContactMessageContent extends InputMessageContent {
  phone_number: string;
  first_name: string;
  last_name?: string;
}

interface ChosenInlineResult {
  result_id: string;
  from: User;
  location?: Location;
  inline_message_id?: string;
  query: string;
}

interface ResponseParameters {
  migrate_to_chat_id?: number;
  retry_after?: number;
}

interface LabeledPrice {
  label: string;
  amount: number;
}

interface Invoice {
  title: string;
  description: string;
  start_parameter: string;
  currency: string;
  total_amount: number;
}

interface ShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
}

interface OrderInfo {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: ShippingAddress;
}

interface ShippingOption {
  id: string;
  title: string;
  prices: LabeledPrice[];
}

interface SuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}

interface ShippingQuery {
  id: string;
  from: User;
  invoice_payload: string;
  shipping_address: ShippingAddress;
}

interface PreCheckoutQuery {
  id: string;
  from: User;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
}

interface ChatMemberUpdated {
  chat: Chat
  from: User
  date: number
  old_chat_member: ChatMember
  new_chat_member: ChatMember
  invite_link: ChatInviteLink
  via_chat_folder_invite_link: boolean
}

interface ChatInviteLink {
  invite_link: string
  creator: User
  creates_join_request: boolean
  is_primary: boolean
  is_revoked: boolean
  name?: string
  expire_date?: number
  member_limit?: number
  pending_join_request_count?: number
}

interface Game {
  title: string;
  description: string;
  photo: PhotoSize[];
  text?: string;
  text_entities?: MessageEntity[];
  animation?: Animation;
}

export interface Animation extends FileBase {
  width: number;
  height: number;
  duration: number;
  /** @deprecated */
  thumb?: PhotoSize;
  thumbnail?: PhotoSize;
  file_name?: string;
  mime_type?: string;
}

type CallbackGame = object;

interface GameHighScore {
  position: number;
  user: User;
  score: number;
}

interface Metadata {
  type?: MessageType;
}

interface BotCommand {
  command: string
  description: string
}

type BotCommandScope = BotCommandScopeDefault |
  BotCommandScopeAllPrivateChats |
  BotCommandScopeAllGroupChats |
  BotCommandScopeAllChatAdministrators |
  BotCommandScopeChat |
  BotCommandScopeChatAdministrators |
  BotCommandScopeChatMember 

interface BotCommandScopeDefault {
  type: 'default';
}

interface BotCommandScopeAllPrivateChats {
  type: 'all_private_chats';
}

interface BotCommandScopeAllGroupChats {
  type: 'all_group_chats';
}

interface BotCommandScopeAllChatAdministrators {
  type: 'all_chat_administrators';
}

interface BotCommandScopeChat {
  type: 'chat';
  chat_id: number | string;
}

interface BotCommandScopeChatAdministrators {
  type: 'chat_administrators';
  chat_id: number | string;
}

interface BotCommandScopeChatMember {
  type: 'chat_member';
  chat_id: number | string;
  user_id: number;
}



/**
 * Methods
 */
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
}

export function setWebhook(token: string, body: SetWebHookOptions, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
    signal
  }).then(parseResponse<Boolean>)
}

export function deleteWebhook(token: string, params: {
  drop_pending_updates?: boolean
}, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/deleteWebhook`, {
    method: "POST",
    body: JSON.stringify(params),
    headers,
    signal
  }).then(parseResponse<Boolean>)
}

/** @todo cehck if response is the same as in typings */
export function getWebhookInfo(token: string, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`, {
    method: "POST",
    body: JSON.stringify({}),
    headers,
    signal
  }).then(parseResponse<WebhookInfo>)
}

export function getMe(token: string, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getMe`, {
    method: "POST",
    body: JSON.stringify({}),
    headers,
    signal
  }).then(parseResponse<User>)
}

export function sendMessage(token: string, payload: SendMessageOptions, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Message>)
}

export function editMessageText(token: string, payload: EditMessageTextOptions, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Message>)
}

export function sendPhoto(token: string, payload: SendBasicOptions & {
  photo: string
  caption?: string
  parse_mode?: ParseMode
}, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Message>)
}

export function sendAnimation(token: string, payload: SendAnimationOptions, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/sendAnimation`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Message>)
}

/**
   * @example 
   * 
   * const body = new FormData()
   *
   * body.append("chat_id", payload.chat_id)
   * body.append("caption", payload.caption)
   * body.append("document", payload.document, payload.documentName)
   *
   * if (payload.parse_mode) {
   *   body.append("parse_mode", payload.parse_mode)
   * }
   * 
   * sendDocument("token", payload)
   */
export function sendDocument(token: string, payload: SendDocumentOptions | FormData, signal: AbortSignal) {
  let h: HeadersInit | undefined = headers
  let b: BodyInit | undefined = undefined

  if (payload instanceof FormData) {
    h = undefined
    b = payload
  }
  else {
    b = JSON.stringify(payload)
  }

  return fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: b,
    headers: h,
    signal
  }).then(parseResponse<Message>)
}

export function sendMediaGroup(token: string, payload: SendMediaGroupOptions, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Message[]>)
}

export function setMessageReaction(token: string, payload: {
  chat_id: string | number
  message_id: number
  reaction?: ReactionType[]
  is_big?: boolean
}, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/setMessageReaction`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Boolean>)
}

export function getUserProfilePhotos(token: string, payload: {
  user_id: number | string
  offset?: number;
  limit?: number;
}, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getUserProfilePhotos`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<UserProfilePhotos>)
}

export function getFile(token: string, payload: {
  file_id: string
}, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getFile`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<File>)
}

export function answerCallbackQuery(token: string, payload: AnswerCallbackQueryOptions, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<File>)
}

export function getChat(token: string, payload: {
  chat_id: string
}, signal: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getChat`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Chat>)
}

export function getChatMember(token: string, payload: { chat_id: string, user_id: string }, signal?: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getChatMember`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal: signal
  }).then(parseResponse<ChatMember>)
}

export function setMyCommands(token: string, payload: SetMyCommandsOptions, signal?: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/setMyCommands`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<void>)
}

export function getMyCommands(token: string, payload?: GetMyCommandsOptions, signal?: AbortSignal) {
  return fetch(`https://api.telegram.org/bot${token}/getMyCommands`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<BotCommand[]>)
}

export function deleteMyCommands(token: string, payload: DeleteMyCommandsOptions, signal: AbortSignal): Promise<Chat> {
  return fetch(`https://api.telegram.org/bot${token}/deleteMyCommands`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
    signal
  }).then(parseResponse<Chat>)
}

/**
 * Parsers
 */

export function parseUpdate(update: any): Update {
  const u: Update = {
    update_id: Number(update.update_id)
  }

  if (update.message) {
    u.message = parseMessage(update.message)
  }

  if (update.edited_message) {
    u.edited_message = parseMessage(update.edited_message)
  }

  if (update.callback_query) {
    u.callback_query = parseCallbackQuery(update.callback_query)
  }

  if (update.message_reaction) {
    u.message_reaction = parseMessageReaction(update.message_reaction)
  }

  if (update.message_reaction_count) {
    u.message_reaction_count = parseMessageReactionCount(update.message_reaction_count)
  }

  return {
    ...update,
    u
  }
}

function parseMessage(m: any): Message {
  return {
    ...m,
    message_id: Number(m.message_id),
    from: m.from ? parseUser(m.from) : void 0,
    date: Number(m.date),
    chat: parseChat(m.chat),
    text: String(m.text ?? ""),
    forward_from: m.forward_from ? parseUser(m.forward_from) : void 0, // User;
    forward_from_chat: m.forward_from_chat ? parseChat(m.forward_from_chat) : void 0, // Chat;
    forward_from_message_id: m.forward_from_message_id ? Number(m.forward_from_message_id) : void 0, // number;
    forward_signature: m.forward_signature ? String(m.forward_signature) : void 0, // string;
    forward_sender_name: m.forward_sender_name ? String(m.forward_sender_name) : void 0, // string;
    forward_date: m.forward_date ? Number(m.forward_date) : void 0, // number;
    reply_to_message: m.reply_to_message ? parseMessage(m.reply_to_message) : void 0,
    is_automatic_forward: m.is_automatic_forward != null ? Boolean(m.is_automatic_forward) : void 0,
    edit_date: m.edit_date ? Number(m.edit_date) : void 0, // number;
    media_group_id: m.media_group_id ? String(m.media_group_id) : void 0, // string;
    author_signature: m.author_signature ? String(m.author_signature) : void 0, // string;
    entities: m.entities ? parseEntities(m.entities) : void 0, // MessageEntity[];
    // caption_entities: m.caption_entities ? parseSometh(m.caption_entities) : void 0, // MessageEntity[];
    audio: m.audio ? parseAudio(m.audio) : void 0,
    document: m.document ? parseDocument(m.document) : void 0,
    animation: m.animation ? parseAnimation(m.animation) : void 0,
    // game?: Game;
    photo: m.photo ? parsePhotoSizes(m.photo) : void 0,
    sticker: m.sticker ? parseSticker(m.sticker) : void 0,
    video: m.video ? parseVideo(m.video) : void 0,
    voice: m.voice ? parseVoice(m.voice) : void 0,
    video_note: m.video_note ? parseVideoNote(m.video_note) : void 0,
    caption: m.caption ? String(m.caption) : void 0,
    contact: m.contact ? parseContact(m.contact) : void 0,
    location: m.location ? parseLocation(m.location) : void 0,
    venue: m.venue ? parseVenue(m.venue) : void 0,
    poll: m.poll ? parsePoll(m.poll) : void 0,
    // new_chat_members?: User[];
    // new_chat_title?: string;
    // new_chat_photo?: PhotoSize[];
    // delete_chat_photo?: boolean;
    // group_chat_created?: boolean;
    // supergroup_chat_created?: boolean;
    // channel_chat_created?: boolean;
    // migrate_to_chat_id?: number;
    // migrate_from_chat_id?: number;
    // pinned_message?: Message;
    // invoice?: Invoice;
    // successful_payment?: SuccessfulPayment;
    // connected_website?: string;
    // passport_data?: PassportData;
    // reply_markup?: InlineKeyboardMarkup;
    sender_chat: m.sender_chat ? parseChat(m.sender_chat) : void 0,
  }
}

function parseUser(u: User): User {
  return {
    id: String(u.id),
    is_bot: Boolean(u.is_bot),
    first_name: String(u.first_name),
    last_name: String(u.last_name ?? ""),
    username: String(u.username ?? ""),
    language_code: String(u.language_code ?? ""),
    is_premium: Boolean(u.is_premium ?? ""),
  }
}

function parseChat(c: Chat) {
  return {
    id: Number(c.id),
    type: c.type,
    title: String(c.title ?? ""),
    username: String(c.username ?? ""),
    first_name: String(c.first_name ?? ""),
    last_name: String(c.last_name ?? ""),
  }
}

function parsePhotoSizes(p: PhotoSize[]) {
  if (!Array.isArray(p)) {
    return void 0
  }

  return p.map(parsePhotoSize)
}

function parsePhotoSize(p: PhotoSize) {
  return {
    file_id: String(p.file_id),
    file_unique_id: String(p.file_unique_id),
    file_size: Number(p.file_size),
    width: Number(p.width),
    height: Number(p.height),
  }
}

function parseSticker(v: Sticker): Sticker {
  return {
    file_id: String(v.file_id),
    width: Number(v.width),
    height: Number(v.height),
    thumb: v.thumb ? parsePhotoSize(v.thumb) : void 0,
    thumbnail: v.thumbnail ? parsePhotoSize(v.thumbnail) : void 0,
    emoji: String(v.emoji),
  }
}

function parseVideo(v: Video): Video {
  return {
    file_id: String(v.file_id),
    width: Number(v.width),
    height: Number(v.height),
    duration: Number(v.duration),
    thumb: v.thumb ? parsePhotoSize(v.thumb) : void 0,
    mime_type: String(v.mime_type ?? ""),
    file_name: String(v.file_name ?? ""),
    file_size: Number(v.file_size ?? ""),
  }
}

function parseVoice(v: Voice): Voice {
  return {
    file_id: String(v.file_id),
    file_size: Number(v.file_size),
    duration: Number(v.duration),
    mime_type: String(v.mime_type)
  }
}

function parseVideoNote(v: VideoNote): VideoNote {
  return {
    file_id: String(v.file_id),
    length: Number(v.length),
    duration: Number(v.duration),
    thumb: v.thumb ? parsePhotoSize(v.thumb) : void 0,
  }
}

function parseEntities(v: MessageEntity[]): MessageEntity[] {
  if (!Array.isArray(v)) {
    return []
  }

  return v.map(function (entity) {
    return {
      type: entity.type,
      offset: entity.offset,
      length: entity.length,
      url: String(entity.url ?? ""),
      user: entity.user ? parseUser(entity.user) : void 0,
    }
  })
}

function parseAudio(v: Audio): Audio {
  return {
    file_id: String(v.file_id),
    duration: Number(v.duration),
    title: String(v.title ?? ""),
    performer: String(v.performer ?? ""),
    file_name: String(v.file_name ?? ""),
    mime_type: String(v.mime_type ?? ""),
  }
}

function parseDocument(v: Document): Document {
  return {
    file_id: String(v.file_id),
    file_name: String(v.file_name || ""),
    mime_type: String(v.mime_type || ""),
    file_size: Number(v.file_size || 0),
  }
}

function parseAnimation(v: Animation): Animation {
  return {
    file_id: String(v.file_id),
    width: Number(v.width),
    height: Number(v.height),
    duration: Number(v.duration),
    file_name: String(v.file_name),
    mime_type: String(v.mime_type || ""),
    thumb: v.thumb ? parsePhotoSize(v.thumb) : void 0,
    thumbnail: v.thumbnail ? parsePhotoSize(v.thumbnail) : void 0,
  }
}

function parseContact(v: Contact) {
  return {
    phone_number: String(v.phone_number),
    first_name: String(v.first_name),
    last_name: String(v.last_name ?? ""),
    user_id: Number(v.user_id ?? ""),
    vcard: String(v.vcard ?? ""),
  }
}

function parseLocation(v: Location) {
  return {
    longitude: Number(v.longitude),
    latitude: Number(v.latitude),
  }
}

function parseVenue(v: Venue) {
  return {
    location: parseLocation(v.location),
    title: String(v.title),
    address: String(v.address),
    foursquare_id: String(v.foursquare_id ?? ""),
    foursquare_type: String(v.foursquare_type ?? ""),
    google_place_id: String(v.google_place_id ?? ""),
    google_place_type: String(v.google_place_type ?? ""),
  }
}

function parsePoll(v: Poll) {
  return {
    id: String(v.id),
    question: String(v.question),
    options: parsePollOptions(v.options),
    is_closed: Boolean(v.is_closed),
  }
}

function parsePollOptions(v: PollOption[]) {
  return Array.isArray(v) ? v.map(parsePollOption) : []
}

function parsePollOption(v: PollOption) {
  return {
    text: String(v.text),
    voter_count: Number(v.voter_count),
  }
}

/**
 * @see https://core.telegram.org/bots/api#callbackquery
 */
function parseCallbackQuery(v?: CallbackQuery): CallbackQuery | undefined {
  if (!v) {
    return
  }

  return {
    id: String(v.id),
    from: parseUser(v.from),
    data: String(v.data ?? ""),
    message: parseMessage(v.message),
    chat_instance: String(v.chat_instance ?? ""),
  }
}

function parseMessageReaction(d?: MessageReactionUpdated): MessageReactionUpdated | undefined {
  if (!d) {
    return
  }

  return {
    chat: parseChat(d.chat),
    message_id: Number(d.message_id),
    user: d.user ? parseUser(d.user) : void 0,
    actor_chat: d.actor_chat ? parseChat(d.actor_chat) : void 0,
    date: Number(d.date),
    old_reaction: parseReactions(d.old_reaction),
    new_reaction: parseReactions(d.new_reaction),
  }
}

function parseReactions(reactions: ReactionType[]): ReactionType[] {
  if (!Array.isArray(reactions)) {
    return []
  }

  return reactions.map(parseReaction)
}

function parseReaction(reaction: ReactionType): ReactionType {
  if (reaction.type === "emoji") {
    return {
      type: "emoji",
      emoji: String(reaction.emoji),
    }
  }

  if (reaction.type === "custom_emoji") {
    return {
      type: "custom_emoji",
      custom_emoji_id: String(reaction.custom_emoji_id),
    }
  }

  throw new RangeError(`Unknown type of reaction: ${JSON.stringify(reaction)}`)
}

function parseMessageReactionCount(d?: MessageReactionCountUpdated): MessageReactionCountUpdated | undefined {
  if (!d) {
    return d
  }

  return {
    chat: parseChat(d.chat),
    message_id: Number(d.message_id),
    date: Number(d.date),
    reactions: parseReactionsCount(d.reactions)
  }
}

function parseReactionsCount(reactions?: ReactionCount[]): ReactionCount[] {
  if (!Array.isArray(reactions)) {
    return []
  }

  return reactions.map(parseReactionCount)
}

function parseReactionCount(reaction: ReactionCount): ReactionCount {
  return {
    type: parseReaction(reaction.type),
    total_count: Number(reaction.total_count),
  }
}

export function parseResponse<T>(response: Response) {
  return response.text().then(function (text) {
    let data: any

    try {
      data = JSON.parse(text)
    }
    catch (err) {
      throw new TelegramError(`Invalid response: ${text}`, response.status)
    }

    const ok = Boolean(data.ok)

    if (ok) {
      return data.result as T
    }

    const error_code = Number(data.error_code ?? 0)
    const description = String(data.description ?? "")
    const parameters = data.parameters || {}

    throw new TelegramError(description, error_code, parameters)
  })
}

export class TelegramError extends Error {
  status: number
  data: Record<string, any>

  constructor(message: string, status: number, data: Record<string, any> = {}) {
    super(message)

    this.status = status
    this.data = data
  }
}

/**
 * Helpers
 */
export const SUPPORTED_REACTION_EMOJI = ["👍", "👎", "\u2764\ufe0f" // red heart
  , "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢"
  , "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥"
  , "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋"
  , "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝"
  , "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄"
  , "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡"
]

export function isUnauthorizedError(err: unknown): boolean {
  return err instanceof Error && err.message === "Unauthorized"
}

export function isBotBlockedByUserError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Forbidden: bot was blocked by the user")
}

export function isChatNotFoundError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: chat not found")
}

export function isUserDeactivatedError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Forbidden: user is deactivated")
}

export function isBotKickedFromSupergroupError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Forbidden: bot was kicked from the supergroup chat")
}

export function isNotEnoughRightsError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: not enough rights to send text messages to the chat")
}

export function isUpgradeToSupergroupChatError(err: unknown): boolean {
  return err instanceof Error && err.message.includes("Bad Request: group chat was upgraded to a supergroup chat")
}
