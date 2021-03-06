// tslint:disable-next-line:class-name
export class UP_CLIENT_CONNECTION_SETTINGS {
  public static get frontEndScheme(): string {return 'https';}
  public static get frontEndPort(): string {return '8443';}
  public static get frontEndUPCBaseURL(): string {return '/portal';}
  public static get frontEndUPSBaseURL(): string {return '/ups';}
  public static get frontEndSWCBaseURL(): string {return '/uwd/dist';}
  public static get frontEndESGBaseURL(): string {return '/csg';}
}

export class URL {
  // tslint:disable-next-line:typedef
  public static get ACS() {return {
    RESOURCES: '/acs/resources'
  };}
  // tslint:disable-next-line:typedef
  public static get UPC() {return {
    BASE: '/tenants/:alias',
    JOIN: '/',
    SCHEDULE: '/schedule',
    RECORDINGS: '/recording/',
    REMIND_PASSWORD: '/remind_password/'
  };}
  // tslint:disable-next-line:typedef
  public static get UPS() {return {
    MEETINGS_GET_TOKEN: UP_CLIENT_CONNECTION_SETTINGS.frontEndUPSBaseURL + '/resources/middleware/token',
    RESOURCES: UP_CLIENT_CONNECTION_SETTINGS.frontEndUPSBaseURL + '/resources/tenants/',
    ALIAS: UP_CLIENT_CONNECTION_SETTINGS.frontEndUPSBaseURL + '/resources/middleware/tenant_alias?vrNumber='
  };}
  // tslint:disable-next-line:typedef
  public static get UWS() {return {
    JOIN_MEET_ME_SWC: UP_CLIENT_CONNECTION_SETTINGS.frontEndSWCBaseURL + '/index.html?'
  };}
  // tslint:disable-next-line:typedef
  public static get ASSR() {return {
    PROGRAMS: '/api/manager/programs',
    CATEGORIES: '/api/manager/categories'
  };}
}


// tslint:disable-next-line:class-name
export class DATE_FORMAT {
  public static get MM_DD_YY(): string {return 'MM/DD/YY';}
  public static get  DD_MM_YY(): string {return 'DD/MM/YY';}
}

// tslint:disable-next-line:class-name
export class AUTH_TYPE {
  public static get OAUTH_AND_PASSWORD(): string { return 'OAUTH_AND_PASSWORD';}
  public static get OAUTH_ONLY(): string { return 'OAUTH_ONLY';}
  public static get PASSWORD_ONLY(): string { return 'PASSWORD_ONLY';}
}

// tslint:disable-next-line:class-name
export class LOCAL_STORAGE {
  public static get ALIAS(): string { return 'ALIAS';}
  public static get UPS_TOKEN(): string { return 'UPS_TOKEN';}
  public static get SKIP_SSO(): string { return 'SKIP_SSO';}
  public static get USER_DATA() : {LOGIN: string, ENCRYPTED_PASSWORD: string} { return {
    LOGIN: 'LOGIN',
    ENCRYPTED_PASSWORD: 'ENCRYPTED_PASSWORD'
  };}
  public static get GUEST_NAME(): string { return 'GUEST_NAME';}
  public static get HAS_FIRST_DOWNLOAD_ROLLOVER_SHOWN(): string { return 'HAS_FIRST_DOWNLOAD_ROLLOVER_SHOWN';}
  public static get OAUTH2_REFRESH_TOKEN(): string {return 'OAUTH2_REFRESH_TOKEN';}
}

// tslint:disable-next-line:class-name
export class STATUS_CODE {
  public static get OK(): number {return 200;}
  public static get BAD_REQUEST(): number {return 400;}
  public static get UNAUTHORIZED(): number {return 401;}
  public static get NOT_FOUND(): number {return 404;}
  public static get INTERNAL_SERVER_ERROR(): number {return 500;}
  public static get SERVICE_UNAVAILABLE(): number {return 503;}
}

// tslint:disable-next-line:class-name
export class ERROR_CODE {
  // tslint:disable-next-line:typedef
  public static get GENERAL() {return {
    INTERNAL_SERVER_ERROR: 'ERC_INTERNAL_SERVER_ERROR',
    MISSING_REQUEST_PARAM: 'ERC_MISSING_REQUEST_PARAM'
  };}
  // tslint:disable-next-line:typedef
  public static get MEETING() {return {
    VIRTUAL_ROOM_REQUIRED: 'ERC_VIRTUAL_ROOM_REQUIRED',
    ERROR_INVALID_P2P_INFO: 'ERROR_INVALID_P2P_INFO',
    ERC_MCU_RESOURCE_SHORTAGE: 'ERC_MCU_RESOURCE_SHORTAGE',
    ERC_WAITING_ROOM_REQUIRED_IN_TE: 'ERC_WAITING_ROOM_REQUIRED_IN_TE'
  };}
  // tslint:disable-next-line:typedef
  public static get JOIN() {return  {
    INCORRECT_INPUT: 'ERC_JC_INCORRECT_INPUT',
    ERC_WRONG_CURRENT_CONFERENCE: 'ERC_WRONG_CURRENT_CONFERENCE',
    ERC_DISALLOW_INITIATE_NON_VIRTUAL_ROOM_MEETING : 'ERC_DISALLOW_INITIATE_NON_VIRTUAL_ROOM_MEETING',
    ERC_JC_ONE_TIME_PIN_REQUIRED: 'ERC_JC_ONE_TIME_PIN_REQUIRED',
    ERC_JC_FORBIDDEN_ONE_TIME_PIN_REQUIRED: 'ERC_JC_FORBIDDEN_ONE_TIME_PIN_REQUIRED',
    ERC_LOCKED_CONFERENCE: 'ERC_LOCKED_CONFERENCE',
    ERC_START_CONF_FAILED: 'ERC_START_CONF_FAILED',
    ERC_NO_DEFAULT_MCU_SERVICE_DEFINED_IN_VIRTUAL_ROOM: 'ERC_NO_DEFAULT_MCU_SERVICE_DEFINED_IN_VIRTUAL_ROOM',
    ERC_WEB_COLLABORATION_DISABLED: 'ERC_WEB_COLLABORATION_DISABLED',
    MEETING_NOT_STARTED_YET: 'ERC_MEETING_NOT_STARTED_YET',
    ERC_VIRTUAL_ROOM_NOT_ALLOW_INSTANT_MEETING: 'ERC_VIRTUAL_ROOM_NOT_ALLOW_INSTANT_MEETING',
    ERC_AUTH_ACCESS_DENIED: 'ERC_AUTH_ACCESS_DENIED',
    WRONG_MEETING_ID: 'WRONG_MEETING_ID',
    AUDIO_VIDEO_PRESENTATION: 'Audio/Video + Presentation',
    AUDIO_PRESENTATION: 'Audio + Presentation',
    PRESENTATION_ONLY: 'Presentation Only',
    FAIL_TO_JOIN_UNAUTHORIZED_PARTICIPANT_ID: 'FAIL_TO_JOIN_UNAUTHORIZED_PARTICIPANT_ID'
  };}
  // tslint:disable-next-line:typedef
  public static get AUTH() {return {
    TOKEN_EXPIRED: 'ERC_AUTH_TOKEN_EXPIRED',
    TOKEN_INVALID: 'ERC_AUTH_TOKEN_INVALID',
    ORG_NOT_EXIST: 'ERC_ORG_NOT_EXIST',
    ACCESS_DENIED: 'ERC_AUTH_ACCESS_DENIED',
    USER_AUTH_DISABLED: 'ERC_AUTH_USER_AUTH_DISABLED',
    ERC_AUTH_USER_NAME: 'ERC_AUTH_USER_NAME',
    ERC_AUTH_EMPTY_EMAIL: 'ERC_AUTH_EMPTY_EMAIL'
  };}
  // tslint:disable-next-line:typedef
  public static get SCHEDULE() {return {
    VIRTUAL_CONFERENCE_ID_CONFLICTED: 'ERC_VIRTUAL_CONFERENCE_ID_CONFLICTED'
  };}
  // tslint:disable-next-line:typedef
  public static get CONTACT_SEARCH() {return {
    REQUEST_CANCELED: 'REQUEST_CANCELED'
  };}
  // tslint:disable-next-line:typedef
  public static get CLIENT() {return {
    SWC_PO_ONLY_SUPPORTED: 'SWC_PO_ONLY_SUPPORTED',
    NO_RESOURCES: 'NO_RESOURCES',
    PREFERRED_CLIENT_ISSUE: 'PREFERRED_CLIENT_ISSUE',
    UPDATE_REQUIRED: 'UPDATE_REQUIRED',
    MIN_VERSION: '3.4.0.120'
  };}
}

// tslint:disable-next-line:class-name
export class USER_TYPE {
  public static get GUEST(): string {return 'GUEST';}
  public static get SIGN_IN(): string {return 'SIGN_IN';}
}

export class EVENT {
  // tslint:disable-next-line:typedef
  public static get DEFAULT() {return {
    STATE_CHANGE_START: '$stateChangeStart',
    TRANSLATE_LOADING_SUCCESS: '$translateLoadingSuccess',
    LOCALE_CHANGE_ERROR: '$localeChangeError'
  };}
  // tslint:disable-next-line:typedef
  public static get CUSTOM() {
    return {
      VIDEO_CALLING_PREFERENCES_CHANGED: 'VIDEO_CALLING_PREFERENCES_CHANGED',
      SUCCESSFUL_LOGIN_WITH_CREDENTIALS: 'SUCCESSFUL_LOGIN_WITH_CREDENTIALS',
      UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
      LOADING_STARTED: 'LOADING_STARTED',
      LOADING_FINISHED: 'LOADING_FINISHED',
      SHOW_SETTINGS: 'SHOW_SETTINGS',
      SHOW_GUEST_SETTINGS: 'SHOW_GUEST_SETTINGS',
      SHOW_CHANGE_PASSWORD: 'SHOW_CHANGE_PASSWORD',
      SHOW_DETECT_AC: 'SHOW_DETECT_AC',
      SHOW_DETECT_SDC: 'SHOW_DETECT_SDC',
      CHECK_AUTO_JOIN: 'CHECK_AUTO_JOIN',
      CHECK_NO_CHAT: 'CHECK_NO_CHAT',
      SUCCESSFUL_LOGIN: 'SUCCESSFUL_LOGIN',
      STOP_RECORDING: 'STOP_RECORDING',
      SUCCESSFUL_LOGOUT: 'SUCCESSFUL_LOGOUT',
      PLAYBACK: 'PLAYBACK_VIDEO',
      RETURN_BROWSE: 'RETURN_TO_BROWSE',
      REMOVE_PASSWORD: 'REMOVE_PASSWORD',
      SEND_PLAYBACK: 'SEND_PLAYBACK',
      CATEGORY_SELECTED: 'CATEGORY_SELECTED',
      RECORDING_CATEGORY_CHANGED: 'RECORDING_CATEGORY_CHANGED',
      RECOEDING_ACCESS_CHANGED: 'RECOEDING_ACCESS_CHANGED',
      TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
      RESOURCES_UPDATED: 'RESOURCES_UPDATED',
      GET_LOCALIZATION: 'GET_LOCALIZATION',
      SEARCH_RECORDINGS: 'SEARCH_RECORDINGS',
      CHANGE_PASSWORD: 'CHANGE_PASSWORD',
      CONFERENCE_STARTED: 'CONFERENCE_STARTED',
      SHOW_ABOUT: 'SHOW_ABOUT',
      AUTO_FILL_UPDATE: 'AUTO_FILL_UPDATE',
      USER_TYPE_DETECTED: 'USER_TYPE_DETECTED',
      DEFAULT_VIRTUAL_ROOM_UPDATED: 'DEFAULT_VIRTUAL_ROOM_UPDATED',
      MEETING_OPEN: 'MEETING_OPEN',
      MEETING_DELETE: 'MEETING_DELETE',
      MEETING_DELETE_OCCURRENCE: 'MEETING_DELETE_OCCURRENCE',
      MEETING_DELETE_SERIES: 'MEETING_DELETE_SERIES',
      RECORDING_UPDATED: 'RECORDING_UPDATED',
      RECORDING_SERVICE_INITIALIZED: 'RECORDING_SERVICE_INITIALIZED',
      DEVICE_CHANGE: 'DEVICE_CHANGE',
      STOP_CHECKING_INTERVAL: 'STOP_CHECKING_INTERVAL',
      CLIENT_WAS_DETECTED: 'CLIENT_WAS_DETECTED',
      MOVE_TAG_IN_TAG_SELECTOR: 'MOVE_TAG_IN_TAG_SELECTOR',
      ID_WAS_CHANGED: 'ID_WAS_CHANGED',
      RESET_FIRST_LAUNCH_TUTORIALS: 'RESET_FIRST_LAUNCH_TUTORIALS',
      CHECK_VIRTUAL_ROOM_PIN_UPDATE: 'CHECK_VIRTUAL_ROOM_PIN_UPDATE',
      SET_VIRTUAL_ROOM_NUMBER: 'SET_VIRTUAL_ROOM_NUMBER',
      REMOVE_CURRENT_RECORDING: 'REMOVE_CURRENT_RECORDING'
    };
  }
}

// tslint:disable-next-line:class-name
export class SESSION_STORAGE {
  public static get SESSION_IS_ACTIVE(): string {return 'SESSION_IS_ACTIVE';}
}

export class BROWSERS {
  public static get CHROME(): string {return 'Chrome';}
  public static get FIREFOX(): string {return 'Firefox';}
  public static get IE(): string {return 'IE';}
  public static get MS_EDGE_CHROMIUM(): string {return 'MS-Edge-Chromium';}
  public static get MS_EDGE(): string {return 'MS-Edge';}
  public static get YANDEX(): string {return 'Yandex';}
  public static get SAFARI(): string {return 'Safari';}
  public static get OPERA(): string {return 'Opera';}
  public static get FB_MESSANGER(): string {return 'FB-Messanger';}
  public static get SAMSUNG(): string {return 'Samsung';}
  public static get UCBROWSER(): string {return 'UC-Browser';}
  public static get CORDOVA(): string {return 'Cordova';}
}

export class OS {
  public static get WINDOWS(): string {return 'Windows';}
  public static get MAC(): string {return 'Mac';}
  public static get IOS(): string {return 'iOS';}
  public static get ANDROID(): string {return 'Android';}
  public static get LINUX(): string {return 'Linux';}
  public static get CHROME_OS(): string {return 'Chrome-OS';}
}

// tslint:disable-next-line:class-name
export class CLIENT_TYPE {
  public static get SDC():string {return 'SDC';}
  public static get AC():string {return 'AC';}
  public static get SWC():string {return 'SWC';}
  public static get SMC():string {return 'SMC';}
}

// tslint:disable-next-line:class-name
export class INDEXED_DB {
  public static get DB_NAME():string {return 'LogsDB';}
  public static get DB_VERSION():number {return 1;}
  public static get DB_STORE_NAME():string {return 'Logs';}
}

// tslint:disable-next-line:class-name
export class SWC_LOGS {
  public static get SUBJECT():string {return 'Equinox Conferencing Problem Report on ';}
  public static get BODY():string {return 'Summary of the problem:\n\nApproximate time when experiencing the problem:\n\nSteps that lead to the problem:\n\nIs it reproducible? (100% or Intermittent)\n\nIf the log file is not auto attached to this email, please download the logs and attach to this email.\n\nIf you have some screenshots, please attach to this email.\n\nAAWG Build: ';}
}


// tslint:disable-next-line:class-name
export class PIN_TYPE {
  public static get MODERATOR_PIN():string {return 'MODERATOR_PIN';}
  public static get MEETING_PIN():string {return 'MEETING_PIN';}
  public static get RECORDING_AND_BROADCAST_PIN():string {return 'RECORDING_AND_BROADCAST_PIN';}
}

// tslint:disable-next-line:class-name
export class PIN_MAX_LENGTH {
  public static get MODERATOR_PIN():number {return 16;}
  public static get MEETING_PIN():number {return 16;}
  public static get RECORDING_AND_BROADCAST_PIN():number {return 255;}
}

// tslint:disable-next-line:class-name
export class KEY_CODE {
  public static get BACKSPACE():number {return 8;}
  public static get TAB():number {return 9;}
  public static get ENTER():number {return 13;}
  public static get ESC():number {return 27;}
  public static get SPACE():number {return 32;}
  public static get LEFT():number {return 37;}
  public static get UP():number {return 38;}
  public static get RIGHT():number {return 39;}
  public static get DOWN():number {return 40;}
}

// tslint:disable-next-line:class-name
export class PARTICIPANT_MODE {
  public static get AUDIO_VIDEO_WITH_PRESENTATION(): string {return 'AUDIO_VIDEO_WITH_PRESENTATION';}
  public static get AUDIO_WITH_PRESENTATION(): string {return 'AUDIO_WITH_PRESENTATION';}
  public static get PRESENTATION_ONLY(): string {return 'PRESENTATION_ONLY';}
  // tslint:disable-next-line:typedef
  public static get JOIN() {return {
    AUDIO_VIDEO_PRESENTATION: 'Audio/Video + Presentation',
    AUDIO_PRESENTATION: 'Audio + Presentation',
    PRESENTATION_ONLY: 'Presentation Only'
  };}
}

// tslint:disable-next-line:class-name
export class MEETING_TYPE {
  public static get AUDIO_ONLY(): string {return 'AUDIO_ONLY';}
  public static get PROCESS_VIDEO(): string {return 'PROCESS_VIDEO';}
  public static get SWITCHED_VIDEO(): string {return 'SWITCHED_VIDEO';}
  public static get MULT_STREAM_SWITCH_VIDEO(): string {return 'MULT_STREAM_SWITCH_VIDEO';}
}

export class SSO_TYPE {
  public static get PEWEBSSO(): string {return 'PE-WEBSSO';}
}

export class DELAY {
  public static get UPCOMING_MEETINGS_TIMEOUT() {return 2000;}
  public static get SCREEN_SHARING_EXTENSION_OFFER_DELAY() {return 2000;}
  public static get OUTLOOK_PLUGIN_OFFER_DELAY() {return 2000;}
  public static get AUTO_JOIN_DELAY() {return 1000;}
  public static get PIN_UPDATE_DELAY() {return 1000;}
}

export class MOBILE_STORE_LINK {
  public static get ANDROID() {return 'https://play.google.com/store/apps/details?id=com.avaya.android.flare';}
  public static get IOS() {return 'http://itunes.apple.com/us/app/avaya-equinox/id933220295';}
}

export class STATE {
// BASE: 'upc',
  public static get JOIN() {return ''}
  // RECORDINGS: 'upc.recordings',
  // SCHEDULE: 'upc.schedule',
  // REMIND_PASSWORD: 'upc.remindPassword'
}

export class DEFAULT_MOBILE_CLIENT {
  public static get AC() {return 'AVAYA_COMMUNICATOR';}
  public static get SMC() {return 'SCOPIA_MOBILE';}
}
