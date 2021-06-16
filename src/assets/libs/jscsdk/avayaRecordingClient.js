/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (window) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Root object for Recording client
     * @public
     * @memberOf window
     * @define AvayaRecordingClient
     * @param {AvayaRecordingClient.Config.ClientConfig} clientConfig
     */
    function AvayaRecordingClient(clientConfig) {
        if (!clientConfig) {
            return false;
        }

        if (clientConfig.logger) {
            window.arcLogger = clientConfig.logger;
        } else if (window.console) {
            window.arcLogger = window.console;
        } else {
            alert('Console object is not exist for that browser, no default logging available then. Please provide specific Logger object.');
        }

        /**
         * @public
         * @type {AvayaRecordingClient.Config.ClientConfig}
         * @desc Config object to pass during JSC SDK Recording package initialization
         * @default {Object}
         */
        this.clientConfig = clientConfig || {};

        /**
         * @public
         * @type {AvayaRecordingClient.Config.Logger}
         * @desc Optional custom logger implementation class
         * @default window.console
         */
        this.logger = arcLogger;

        /**
         * @public
         * @type {AvayaRecordingClient.Services.AuthenticationService}
         * @desc AuthenticationService service instance. Get\refresh auth token from UPS(ESG) server
         */
        this.authenticationService = new AvayaRecordingClient.Services.AuthenticationService(clientConfig.authServer);

        /**
         * @public
         * @type {AvayaRecordingClient.Services.ProgramService}
         * @desc ProgramService service instance. All related to Programs data: view, fetch, edit e t c
         */
        this.programService = new AvayaRecordingClient.Services.ProgramService(clientConfig.serviceServer.resources);

        /**
         * @public
         * @type {AvayaRecordingClient.Services.ChatService}
         * @desc ChatService service instance. IM sessions support
         */
        this.chatService = new AvayaRecordingClient.Services.ChatService(clientConfig.serviceServer.resources);

        /**
         * @public
         * @type {AvayaRecordingClient.Services.SystemSettingsService}
         * @desc SystemSettings service instance
         */
        this.systemSettingsService = new AvayaRecordingClient.Services.SystemSettingsService(clientConfig.serviceServer.resources);

        /**
         * @public
         * @type {AvayaRecordingClient.Services.TenantService}
         * @desc Tenant service instance
         */
        this.tenantService = new AvayaRecordingClient.Services.TenantService(clientConfig.serviceServer.resources);

        /**
         * @public
         * @type {AvayaRecordingClient.Services.ReportService}
         * @desc Reports service instance
         */
        this.reportService = new AvayaRecordingClient.Services.ReportsService(clientConfig.serviceServer.resources);
    }

    window.AvayaRecordingClient = AvayaRecordingClient;
})(window);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *  @desc A bunch of base classes, constants, fixed objects that not depends on exact implementation or server type
     * @namespace AvayaRecordingClient.Base
     * @memberOf AvayaRecordingClient
     * @define AvayaRecordingClient.Base
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Base = AvayaRecordingClient.Base || {};
    })(AvayaRecordingClient);

    /**
     * @desc Shared base classes that can be extended for various use
     * @namespace AvayaRecordingClient.Base.Providers
     * @memberOf AvayaRecordingClient.Base
     * @define AvayaRecordingClient.Base.Providers
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Base.Providers = AvayaRecordingClient.Base.Providers || {};
    })(AvayaRecordingClient);

    /**
     * @desc Constants, resources, regexp patterns e t c
     * @namespace AvayaRecordingClient.Constants
     * @memberOf AvayaRecordingClient
     * @define AvayaRecordingClient.Constants
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Constants = AvayaRecordingClient.Constants || {};
    })(AvayaRecordingClient);

    /**
     * @desc Custom implementations for different server types, API versions and classes
     * @namespace AvayaRecordingClient.Providers
     * @memberOf AvayaRecordingClient
     * @define AvayaRecordingClient.Providers
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers = AvayaRecordingClient.Providers || {};
    })(AvayaRecordingClient);

    /**
     * @desc Authentication Service providers
     * @namespace AvayaRecordingClient.Providers.Authentication
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.Authentication
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Authentication = AvayaRecordingClient.Providers.Authentication || {};
    })(AvayaRecordingClient);

    /**
     * @desc Program Service providers
     * @namespace AvayaRecordingClient.Providers.Program
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.Program
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Program = AvayaRecordingClient.Providers.Program || {};
    })(AvayaRecordingClient);

    /**
     * @desc Chat Service providers
     * @namespace AvayaRecordingClient.Providers.Chat
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.Chat
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Chat = AvayaRecordingClient.Providers.Chat || {};
    })(AvayaRecordingClient);

    /**
     * @desc System Settings Service providers
     * @namespace AvayaRecordingClient.Providers.SystemSettings
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.SystemSettings
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.SystemSettings = AvayaRecordingClient.Providers.SystemSettings || {};
    })(AvayaRecordingClient);

    /**
     * @desc Tenant Service providers
     * @namespace AvayaRecordingClient.Providers.Tenant
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.Tenant
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Tenant = AvayaRecordingClient.Providers.Tenant || {};
    })(AvayaRecordingClient);

    /**
     * @desc Reports Service providers
     * @namespace AvayaRecordingClient.Providers.Reports
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.Reports
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Reports = AvayaRecordingClient.Providers.Reports || {};
    })(AvayaRecordingClient);

    /**
     * @desc Validator classes for service dto objects
     * @namespace AvayaRecordingClient.Providers.Authentication.Validators
     * @memberOf AvayaRecordingClient.Providers.Authentication
     * @define AvayaRecordingClient.Providers.Authentication.Validators
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Authentication.Validators = AvayaRecordingClient.Providers.Authentication.Validators || {};
    })(AvayaRecordingClient);

    /**
     * @desc Validator classes for service dto objects
     * @namespace AvayaRecordingClient.Providers.Program.Validators
     * @memberOf AvayaRecordingClient.Providers.Program
     * @define AvayaRecordingClient.Providers.Program.Validators
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Program.Validators = AvayaRecordingClient.Providers.Program.Validators || {};
    })(AvayaRecordingClient);

    /**
     * @desc Validator classes for service dto objects
     * @namespace AvayaRecordingClient.Providers.Chat.Validators
     * @memberOf AvayaRecordingClient.Providers.Chat
     * @define AvayaRecordingClient.Providers.Chat.Validators
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Chat.Validators = AvayaRecordingClient.Providers.Chat.Validators || {};
    })(AvayaRecordingClient);

    /**
     * @desc Validator classes for service dto objects
     * @namespace AvayaRecordingClient.Providers.SystemSettings.Validators
     * @memberOf AvayaRecordingClient.Providers.SystemSettings
     * @define AvayaRecordingClient.Providers.SystemSettings.Validators
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.SystemSettings.Validators = AvayaRecordingClient.Providers.SystemSettings.Validators || {};
    })(AvayaRecordingClient);

    /**
     * @desc Validator classes for tenant dto objects
     * @namespace AvayaRecordingClient.Providers.Tenant.Validators
     * @memberOf AvayaRecordingClient.Providers.Tenant
     * @define AvayaRecordingClient.Providers.Tenant.Validators
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Tenant.Validators = AvayaRecordingClient.Providers.Tenant.Validators || {};
    })(AvayaRecordingClient);

    /**
     * @desc Reports Service providers
     * @namespace AvayaRecordingClient.Providers.Reports.Validators
     * @memberOf AvayaRecordingClient.Providers
     * @define AvayaRecordingClient.Providers.Reports.Validators
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Providers.Reports.Validators = AvayaRecordingClient.Providers.Reports.Validators || {};
    })(AvayaRecordingClient);

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @desc Contains prototypes of objects which are necessary to provide connection with various servers used by AvayaRecordingClient SDK.
     * @namespace AvayaRecordingClient.Config
     * @memberOf AvayaRecordingClient
     * @define 	 AvayaRecordingClient.Config
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Config = AvayaRecordingClient.Config || {};
    })(AvayaRecordingClient);

    /**
     * @desc URL resources
     * @namespace AvayaRecordingClient.Config.Resources
     * @memberOf AvayaRecordingClient.Config
     * @define 	 AvayaRecordingClient.Config.Resources
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Config.Resources = AvayaRecordingClient.Config.Resources || {};
    })(AvayaRecordingClient);

    /**
     * @desc Specifies response objects for various request types
     * @namespace AvayaRecordingClient.Base.Responses
     * @memberOf AvayaRecordingClient.Base
     * @define 	 AvayaRecordingClient.Base.Responses
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Base.Responses = AvayaRecordingClient.Base.Responses || {};
    })(AvayaRecordingClient);

    /**
     * @desc Services of Recording client
     * @namespace AvayaRecordingClient.Services
     * @memberOf AvayaRecordingClient
     * @define 	 AvayaRecordingClient.Services
     */
    (function (AvayaRecordingClient) {
        AvayaRecordingClient.Services = AvayaRecordingClient.Services || {};
    })(AvayaRecordingClient);

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function ($, AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base REST provider
     * @private
     * @memberOf AvayaRecordingClient.Base.Providers
     * @define AvayaRecordingClient.Base.Providers.RequestBuilder
     */
    function RequestBuilder() {
        /**
         * @private
         * @type {string}
         * @desc Class name to provide into logger
         */
        this._name = '';
    }

    /**
     * @function AvayaRecordingClient.Base.Providers.RequestBuilder#send
     * @memberOf AvayaRecordingClient.Base.Providers.RequestBuilder
     * @desc Send HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.send = function (opts) {
        return $.ajax(this.buildHeaders(opts));
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.RequestBuilder#buildHeaders
     * @memberOf AvayaRecordingClient.Base.Providers.RequestBuilder
     * @desc Build specified headers for HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.buildHeaders = function (opts) {
        return opts;
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.RequestBuilder#setCallbacksAndSend
     * @memberOf AvayaRecordingClient.Base.Providers.RequestBuilder
     * @desc Insert additional promise to handle received result from server
     * @private
     * @param {Object} opts - jQery ajax options object
     * @param {Object} thenCallback - callback for success response
     * @param {Object} failCallback - callback for fail response
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.setCallbacksAndSend = function (opts, thenCallback, failCallback) {
        var serverRequest = this.send(opts);

        var convertResponseToObject = serverRequest.then(function (response) {
                return $.Deferred().resolve(thenCallback(response)).promise();
            }).fail(function (response) {
                return $.Deferred().reject(failCallback(response)).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    AvayaRecordingClient.Base.Providers.RequestBuilder = RequestBuilder;
})(jQuery, AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function ($, AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base validator class. Provide checks for basic types and some common functions. Not a final implementation.
     * @private
     * @memberOf AvayaRecordingClient.Base.Providers
     * @define AvayaRecordingClient.Base.Providers.Validator
     */
    function Validator() {}

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#isNumberType
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Check for number value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isNumberType = function (value) {
        return AvayaRecordingClient.Constants.CONDITIONS.NUMBER.test(value);
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#isIdType
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Check for ID type value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isIdType = function (value) {
        return AvayaRecordingClient.Constants.CONDITIONS.ID.test(value);
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#isStringType
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Check for string value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isStringType = function (value) {
        return AvayaRecordingClient.Constants.CONDITIONS.STRING.test(value);
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#isBooleanValue
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Check for boolean value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isBooleanValue = function (value) {
        return AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN.test(value);
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#isEmptyValue
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Check for empty value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyValue = function (value) {
        return (value === '' || value === null || value === undefined);
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#isEmptyString
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Check for empty string
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyString = function (value) {
        return typeof value === 'string' && value.trim() === '';
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#validate
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Validate value for custom criteria using RegExp expression
     * @private
     * @param value - value to check
     * @param {RegEx} criteria - {@link AvayaRecordingClient.Constants.CONDITIONS}
     * @param {boolean} isMandatory - if yes empty field will return false
     * @returns {boolean}
     */
    Validator.prototype.validate = function (value, criteria, isMandatory) {
        return criteria.test(value) || (!isMandatory && this.isEmptyValue(value));
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#errorInvalidObject
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Invalid object response as a {@link AvayaRecordingClient.Base.Responses.Promise} object
     * @private
     * @param {string} - class name
     * @param {string[]} - Array of field names with error
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    Validator.prototype.errorInvalidObject = function (agent, response) {
        arcLogger.warn(agent + ': errorInvalidObject: %o', response);
        return $.Deferred().reject(response).promise();
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#errorCustomEvent
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Return custom response as a rejected {@link AvayaRecordingClient.Base.Responses.Promise} object
     * @private
     * @param {string} - class name
     * @param {Object} - custom response object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    Validator.prototype.errorCustomEvent = function (agent, response) {
        arcLogger.warn(agent + ': errorCustomEvent: %o', response);
        return $.Deferred().reject(response).promise();
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Validator#buildValidationResponse
     * @memberOf AvayaRecordingClient.Base.Providers.Validator
     * @desc Form response object based on number errors faced during validation
     * @private
     * @param {string[]} - Array of fields with error
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    Validator.prototype.buildValidationResponse = function (errors) {
        return new AvayaRecordingClient.Base.Responses.ObjectValidation(errors);
    };

    AvayaRecordingClient.Base.Providers.Validator = Validator;

})(jQuery, AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base dto class for data objects.
     * @private
     * @memberOf AvayaRecordingClient.Base.Providers
     * @define AvayaRecordingClient.Base.Providers.Dto
     */
    function Dto() {
        /**
         * @private
         * @desc Attaching Validator object to a class
         */
        this._validator = '';
    }

    /**
     * @function AvayaRecordingClient.Base.Providers.Dto#validate
     * @memberOf AvayaRecordingClient.Base.Providers.Dto
     * @public
     * @returns {AvayaRecordingClient.Providers.Validators}
     */
    Dto.prototype.validate = function () {
        return this._validator.validateObject(this);
    };

    /**
     * @function AvayaRecordingClient.Base.Providers.Dto#buildUrlString
     * @memberOf AvayaRecordingClient.Base.Providers.Dto
     * @public
     * @returns {string}
     */
    Dto.prototype.buildUrlString = function () {
        var keys = Object.keys(this),
            self = this;
        var definedKeys = keys.filter(function (param) {
            return self[param] !== undefined;
        });

        var len = definedKeys.length,
            str = '';

        if (len > 0) {
            str += '?';
            for (var i = 0; i < len; i += 1) {
                if (this[definedKeys[i]]) {
                    str += definedKeys[i] + '=' + this[definedKeys[i]];
                    str += (i === len - 1) ? '' : '&';
                }
            }
        }

        if (window.localStorage.ACSR_TOKEN && window.localStorage.ACSR_TOKEN !== "undefined" && window.localStorage.ACSR_TIMESTAMP && window.localStorage.ACSR_TIMESTAMP !== "undefined") {
            str += '&token=' + window.localStorage.ACSR_TOKEN;
            str += '&timestamp=' + window.localStorage.ACSR_TIMESTAMP;
        }

        return str;
    };

    AvayaRecordingClient.Base.Providers.Dto = Dto;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @namespace
     * @desc URL paths
     * @private
     * @memberOf AvayaRecordingClient.Constants
     * @define AvayaRecordingClient.Constants.URLS
     */
    AvayaRecordingClient.Constants.URLS = AvayaRecordingClient.Constants.URLS || {};

    /**
     * @namespace
     * @desc RegExp patterns definitions
     * @private
     * @memberOf AvayaRecordingClient.Constants
     * @define AvayaRecordingClient.Constants.CONDITIONS
     */
    AvayaRecordingClient.Constants.CONDITIONS = AvayaRecordingClient.Constants.CONDITIONS || {};

    /**
     * @namespace
     * @desc HTTP REST Content-types list
     * @private
     * @memberOf AvayaRecordingClient.Constants
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES = AvayaRecordingClient.Constants.CONTENT_TYPES || {};

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.GET_TOKEN
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.GET_TOKEN = 'application/vnd.avaya.portal.authentication.content_server_token.v1+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.GET_TOKEN_ERROR
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.GET_TOKEN_ERROR = 'application/vnd.avaya.csa.error.v1+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.PAGED_LIST
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.PAGED_LIST = 'application/vnd.avaya.asr.paged.list.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS = 'application/vnd.avaya.asr.response.details.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.BASIC_PROGRAM
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.BASIC_PROGRAM = 'application/vnd.avaya.asr.program.basic.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM_ADDRESS
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM_ADDRESS = 'application/vnd.avaya.asr.program.address.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.REPORT
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.REPORT = 'application/vnd.avaya.asr.program.report.receipt.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM = 'application/vnd.avaya.asr.program.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.PASSWORD_PROTECTED_PROGRAM
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.PASSWORD_PROTECTED_PROGRAM = 'application/vnd.avaya.asr.program.password.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.LIST
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.LIST = 'application/vnd.avaya.asr.list.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.CATEGORY
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.CATEGORY = 'application/vnd.avaya.asr.program.category.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.STATUS
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.STATUS = 'application/vnd.avaya.asr.program.status.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.TEMPLATE
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.TEMPLATE = 'application/vnd.avaya.asr.program.template.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_MESSAGE
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_MESSAGE = 'application/vnd.avaya.chat.message.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_SESSION
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_SESSION = 'application/vnd.avaya.chat.session.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.SYSTEM_SETTINGS
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.SYSTEM_SETTINGS = 'vnd.avaya.asr.program.system.settings.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.ACCESS_REPORT
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.ACCESS_REPORT = 'vnd.avaya.asr.program.access.report.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.VIEWER_REPORT
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.VIEWER_REPORT = 'vnd.avaya.asr.program.viewer.report.v2+json';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONTENT_TYPES
     * @define AvayaRecordingClient.Constants.CONTENT_TYPES.VIEWER_REPORT_ENTRY
     */
    AvayaRecordingClient.Constants.CONTENT_TYPES.VIEWER_REPORT_ENTRY = 'vnd.avaya.asr.program.viewer.report.entry.v2+json';

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.NUMBER
     */
    AvayaRecordingClient.Constants.CONDITIONS.NUMBER = /^[0-9]{1,128}$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.STRING
     */
    AvayaRecordingClient.Constants.CONDITIONS.STRING = /^.*$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.MULTI_STRING
     */
    AvayaRecordingClient.Constants.CONDITIONS.MULTI_STRING = /^.*$/m;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.ID
     */
    AvayaRecordingClient.Constants.CONDITIONS.ID = /^[0-9]{1,16}$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN
     */
    AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN = /^TRUE$|^FALSE$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.EMAIL
     */
    AvayaRecordingClient.Constants.CONDITIONS.EMAIL = /.+@.+\..+/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.TIME_UTC
     */
    AvayaRecordingClient.Constants.CONDITIONS.TIME_UTC = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.DATE
     */
    AvayaRecordingClient.Constants.CONDITIONS.DATE = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.TIME_ZONE
     */
    AvayaRecordingClient.Constants.CONDITIONS.TIME_ZONE = /^[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.BASE64
     */
    AvayaRecordingClient.Constants.CONDITIONS.BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.ACCESS_MODE
     */
    AvayaRecordingClient.Constants.CONDITIONS.ACCESS_MODE = /^PRIVATE$|^USER_LIST$|^ALL_USERS$|^PUBLIC$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.DAY_OF_WEEK
     */
    AvayaRecordingClient.Constants.CONDITIONS.DAY_OF_WEEK = /^MON$|^TUE$|^WED$|^THU$|^FRI$|^SAT$|^SUN$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.PLAYERS
     */
    AvayaRecordingClient.Constants.CONDITIONS.PLAYERS = /^HTML5$|^WMP$|^SILVERLIGHT$|^FLASH$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.MIME_IMG
     */
    AvayaRecordingClient.Constants.CONDITIONS.MIME_IMG = /^image\/jpeg$|^image\/png$|^image\/gif$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_STATE
     *
    AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_STATE = /^FAILED$|^COMPLETE$|^PENDING$|^STARTED$|^STOPPED$|^PENDING_STOP$|^PENDING_START$|^SCHEDULED$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.CREATION_STAGE
     */
    AvayaRecordingClient.Constants.CONDITIONS.CREATION_STAGE = /^CREATE_DIRECTORIES$|^CREATE_SCRIPT_RESOURCES$|^CREATE_SLIDESET$|^CREATE_LINKED_RESOURCES$|^CREATE_RESOURCES$|^CREATE_AGGREGATE_RESOURCES$|^PENDING_START$|^COMPLETE DISTRIBUTION_INITIATED$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.RECORDING_STATE
     */
    AvayaRecordingClient.Constants.CONDITIONS.RECORDING_STATE = /^STOPPED$|^STARTED$|^PAUSED$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE
     */
    AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE = /^.{1,1024}$/m;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE_TYPE
     */
    AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE_TYPE = /^QUESTION$|^RESPONSE$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE_TYPE
     */
    AvayaRecordingClient.Constants.CONDITIONS.RETENTION_POLICY = /^FOREVER$|^N_DAYS$|^DO_NOT_RETAIN$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_TYPE
     */
    AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_TYPE = /^LIVE$|^VOD$|^DO_NOT_RETAIN$/i;

    /**
     * @constant
     * @memberOf AvayaRecordingClient.Constants.CONDITIONS
     * @define AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_TYPE
     */
    AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_STATE = /^FAILED$|^COMPLETE$|^PENDING$|^STARTED$|^STOPPED$|^PENDING_STOP$|^PENDING_START$|^SCHEDULED$/i;

})(AvayaRecordingClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

/**
 * NOTE: This class does nothing!
 * It is only use to document jQuery Promise object in order to provide syntax completion.
 */
(function (AvayaRecordingClient) {
    'use strict';
    /**
     * jQuery promise, created from jQuery.Deferred object. See jQuery docs for more detailed information.
     * Promised are used to resolve server responses to requests performed by AvayaClientServices.
     *
     * Note that since all Promise methods return themselves, the methods can be easily chained.
     *
     * @example <caption>Get Meetings list</caption>
     * var successCallback = function(){
     *      console.log("Meeting list was fetched successfully");
     * };
     * var failCallback = function(){
     *      console.log("Error");
     * };
     * service.getMeetingListByStatus(status).then(successCallback, failCallback);
     * // do something else...
     * // when the Promise is resolved, console will print "Meeting list was fetched successfully"
     *
     * @example <caption>Chaining methods</caption>
     * service.getMeetingListByStatus(status).done(doOneThing).done(doOther).done(doAnother).fail(onError);
     *
     *
     * @class
     * @public
     * @memberOf AvayaRecordingClient.Base.Responses
     * @define AvayaRecordingClient.Base.Responses.Promise
     */
    function Promise() {
        /**
         * NOTE: This class does nothing!
         * It is only use to document jQuery Promise object in order to provide syntax completion.
         */
    }

    Promise.prototype = {
        /**
         * Determine the current state of a Deferred object.
         *
         * @public
         * @returns {String}
         */
        state : function () {},

        /**
         * Add handlers to be called when the Deferred object is either resolved or rejected.
         *
         * @param {function} alwaysCallback A function, or array of functions, that is called when the Deferred is resolved or rejected.
         * @returns {AvayaRecordingClient.Base.Responses.Promise}
         */
        always : function (alwaysCallback) {},

        /**
         * Add handlers to be called when the Deferred object is resolved.
         *
         * @example
         * service.getMeetingListByStatus(status).done(function(data){
         *      //invoked on success
         *      //e.g. refresh the UI
         * });
         *
         * @param {function} doneCallback A function, or array of functions, that are called when the Deferred is resolved.
         * @returns {AvayaRecordingClient.Base.Responses.Promise}
         */
        done : function (doneCallback) {},

        /**
         * Add handlers to be called when the Deferred object is rejected.
         *
         * @example
         * service.getMeetingListByStatus(status).fail(function(error){
         *      //invoked on failure
         *      //e.g. show error in UI
         * });
         *
         * @public
         * @param {function} failCallback A function, or array of functions, that are called when the Deferred is rejected.
         * @returns {AvayaRecordingClient.Base.Responses.Promise}
         */
        fail : function (failCallback) {},

        /**
         * Add handlers to be called when the Deferred object generates progress notifications. Please note that not every Promise
         * creates progress notifications.
         *
         * @example
         * service.getMeetingListByStatus(status).progress(function(progressObject){
         *      //invoked on progress
         *      //e.g. refresh progress bar
         * });
         *
         * @public
         * @param {function} progressCallback A function, or array of functions, to be called when the Deferred generates progress notifications.
         * @returns {AvayaRecordingClient.Base.Responses.Promise}
         */
        progress : function (progressCallback) {},

        /**
         * Add handlers to be called for the Deferred object. Combines functionality of .done(), .fail() and .progress().
         *
         * @example
         * service.getMeetingListByStatus(status).then(function(data){
         *      //invoked on success
         *      //e.g. refresh the UI
         * }, function(error){
         *      //invoked on failure
         *      //e.g. show error in UI
         * }, function(progressObject){
         *      //invoked on progress
         *      //e.g. refresh progress bar
         * });
         *
         * @public
         * @param {function} doneCallback A function that is called when the Deferred is resolved.
         * @param {function} [failCallback] A function that is called when the Deferred is rejected.
         * @param {function} [progressCallback] A function that is called when the Deferred generates progress notifications.
         * @returns {AvayaRecordingClient.Base.Responses.Promise}
         */
        then : function (doneCallback, failCallback, progressCallback) {}
    };

    AvayaRecordingClient.Base.Responses.Promise = Promise;

})(AvayaRecordingClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Response is returned to getToken request
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.AuthenticationService.Responses
     * @define AvayaRecordingClient.Services.AuthenticationService.Responses.GetTokenResponse
     * @param {string} returnValue - success or error condition
     * @param {string} data - obtained token or fail reason
     * @param {string} timestamp - timestamp
     */
    function TokenResponse(returnValue, data, timestamp) {

        /**
         * @public
         * @type {string}
         */
        this.returnValue = returnValue;

        if (this.returnValue === 'OK') {
            /**
             * @public
             * @type {string}
             */
            this.token = data;

            /**
             * @public
             * @type {string|number}
             */
            this.timestamp = timestamp;

        } else if (this.returnValue === 401) {
            /**
             * @public
             * @type {string|number}
             */
            this.reason = data;
        }

        return this;
    }

    AvayaRecordingClient.Base.Responses.TokenResponse = TokenResponse;
})(AvayaRecordingClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Response is returned to query program request
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Base.Responses
     * @define AvayaRecordingClient.Base.Responses.QueryProgramResponse
     * @param {string} returnValue - success or error condition
     * @param {AvayaRecordingClient.Services.ProgramService.PagedList} pagedList
     */
    function QueryProgramResponse(returnValue, pagedList) {

        /**
         *
         * Returns response code
         *
         * @public
         * @type {OK|Error}
         */
        this.returnValue = returnValue;

        /**
         *
         * Returns an array of Programs in case of success
         *
         * @public
         * @type {AvayaRecordingClient.Services.ProgramService.PagedList}
         */
        this.pagedList = pagedList;

        return this;
    }

    AvayaRecordingClient.Base.Responses.QueryProgramResponse = QueryProgramResponse;
})(AvayaRecordingClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Response is returned by object validators
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Base.Responses
     * @define AvayaRecordingClient.Base.Responses.ObjectValidation
     * @param {string[]} errors - array of fields with error
     */
    function ObjectValidation(errors) {

        /**
         *
         * Returns true if validation succeeded
         *
         * @public
         * @type {boolean}
         */
        this.success = errors.length === 0;

        /**
         *
         * Returns an object contained errors
         *
         * @public
         * @type {string[]}
         */
        this.errors = errors;

        return this;
    }

    AvayaRecordingClient.Base.Responses.ObjectValidation = ObjectValidation;
})(AvayaRecordingClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Response is returned to query program request
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Base.Responses
     * @define AvayaRecordingClient.Base.Responses.SimpleObjectResponse
     * @param {string} returnValue - success or error condition
     * @param {Object} response
     */
    function SimpleObjectResponse(returnValue, response) {

        /**
         *
         * Returns response code
         *
         * @public
         * @type {OK|Error}
         */
        this.returnValue = returnValue;

        /**
         *
         * Returns response object in case of success
         *
         * @public
         * @type {Object}
         */
        this.response = response;

        return this;
    }

    AvayaRecordingClient.Base.Responses.SimpleObjectResponse = SimpleObjectResponse;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Program Resources paths
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Config.Resources
     * @define AvayaRecordingClient.Config.Resources.ProgramResources
     * @param {Object} resources - object with program resources paths
     */
    function ProgramResources(resources) {

        if (resources) {

            /**
             * @public
             * @type {string}
             * @desc Programs base URL
             */
            this.programsUrl = resources.programsUrl || '';

            /**
             * @public
             * @type {string}
             * @desc Category base URL
             */
            this.categoriesUrl = resources.categoriesUrl || '';

            /**
             * @public
             * @type {string}
             * @desc Template base URL
             */
            this.templatesUrl = resources.templatesUrl || '';

            /**
             * @public
             * @type {string}
             * @desc Reports base URL
             */
            this.reportsUrl = resources.reportsUrl || '/api/manager/reports';
        }
    }

    AvayaRecordingClient.Config.Resources.ProgramResources = ProgramResources;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Authorization Resources paths
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Config.Resources
     * @define AvayaRecordingClient.Config.Resources.AuthorizationResources
     * @param {Object} resources - object containing authorizationUrl property
     */
    function AuthorizationResources(resources) {

        if (resources) {

            /**
             * @public
             * @type {string}
             * @desc UPS URL for get auth token for ACSR
             */
            this.authorizationUrl = resources.authorizationUrl || '';
        }
    }

    AvayaRecordingClient.Config.Resources.AuthorizationResources = AuthorizationResources;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *  @typedef AvayaRecordingClient.Config.ServerInfo.Resources
     *  @desc Data object contained program resources and ACSR base url
     *  @type {object}
     *  @property {AvayaRecordingClient.Config.Resources.ProgramResources} programResources - Program Resources paths
     *  @property {String} baseUrl - ACSR base url
     */

    /**
     *
     * Server data object to communicate with service
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Config
     * @define AvayaRecordingClient.Config.ServerInfo
     * @param {Object} config - server connection data
     */
    function ServerInfo(config) {

        /**
         * @public
         * @type {string}
         * @desc Server hostname
         */
        this.host = config.host || '';

        /**
         * @public
         * @type {number|string}
         * @desc Server port
         */
        this.port = config.port || 0;

        /**
         * @public
         * @type {boolean}
         * @desc HTTP or HTTPS
         */
        this.isSecure = config.isSecure || false;

        /**
         * @public
         * @type {AvayaRecordingClient.Config.ServerInfo.Resources|AvayaRecordingClient.Config.Resources.AuthorizationResources}
         * @desc resources
         */
        this.resources = config.resources || {};
    }

    AvayaRecordingClient.Config.ServerInfo = ServerInfo;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Server data object to communicate with service
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Config
     * @define AvayaRecordingClient.Config.ClientConfig
     * @param {Object} config - server connection data
     */
    function ClientConfig(config) {

        if (config) {
            /**
             * @public
             * @type {AvayaRecordingClient.Config.ServerInfo}
             * @desc UPS authorization server
             */
            this.authServer = new AvayaRecordingClient.Config.ServerInfo(config.authServer);

            /**
             * @public
             * @type {AvayaRecordingClient.Config.ServerInfo}
             * @desc ACSR server
             */
            this.serviceServer = new AvayaRecordingClient.Config.ServerInfo(config.serviceServer);

            /**
             * @public
             * @type {AvayaRecordingClient.Config.Logger}
             * @desc Custom logger
             */
            this.logger = config.logger;
        }
    }

    AvayaRecordingClient.Config.ClientConfig = ClientConfig;
})(AvayaRecordingClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * AvayaRecordingClient.Base.Logger
     * This class do nothing and represented only for documentation purposes
     * By default Service use window.console logger
     * If specific Logger object is needed it should be implemented in scope of
     * {@link AvayaRecordingClient.Config} and should be passed to
     * {Avaya Meeting Management Client} constructor directly
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Config
     * @define AvayaRecordingClient.Config.Logger
     */
    function Logger() {}

    /**
     * @function AvayaRecordingClient.Config.Logger#log
     * @memberOf AvayaRecordingClient.Config.Logger
     * @desc Logs data to console
     * @public
     * @abstract
     */
    Logger.prototype.log = function () {};

    /**
     * @function AvayaRecordingClient.Config.Logger#info
     * @memberOf AvayaRecordingClient.Config.Logger
     * @desc Logs data to console with 'info' label
     * @public
     * @abstract
     */
    Logger.prototype.info = function () {};

    /**
     * @function AvayaRecordingClient.Config.Logger#warn
     * @memberOf AvayaRecordingClient.Config.Logger
     * @desc Logs data to console with 'warn' label
     * @public
     * @abstract
     */
    Logger.prototype.warn = function () {};

    /**
     * @function AvayaRecordingClient.Config.Logger#error
     * @memberOf AvayaRecordingClient.Config.Logger
     * @desc Logs data to console with 'error' label
     * @public
     * @abstract
     */
    Logger.prototype.error = function () {};

    /**
     * @function AvayaRecordingClient.Config.Logger#debug
     * @memberOf AvayaRecordingClient.Config.Logger
     * @desc Logs data to console with 'debug' label
     * @public
     * @abstract
     */
    Logger.prototype.debug = function () {};

    AvayaRecordingClient.Config.Logger = Logger;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Authentication Service class that contains methods for authentication, token renewal e t c routines for Recording client.
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Services
     * @define AvayaRecordingClient.Services.AuthenticationService
     * @param {AvayaRecordingClient.Config.ServerInfo} serverInfo - server connection data
     */
    function AuthenticationService(serverInfo) {

        /**
         * @desc server connection data
         * @public
         * @type {AvayaRecordingClient.Config.ServerInfo}
         */
        this.serverInfo = serverInfo;

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaRecordingClient.Providers.Authentication}
         */
        this._provider = new AvayaRecordingClient.Providers.Authentication.AuthenticationClientProvider(serverInfo);

        /**
         * @desc Keeps information about Authentication Service instance status (started or not)
         * @private
         * @type {Boolean}
         */
        this._isLoggedIn = false;

        /**
         * Triggers when user log out or token refresh is failed
         *
         * @public
         * @function AvayaRecordingClient.Services.AuthenticationService#turnToGuestModeCallbacks
         * @group Callbacks
         *
         */
        this.turnToGuestModeCallbacks = $.Callbacks().add(function () {
                this._isLoggedIn = false;
            });

        /**
         * Triggers when user logs in
         *
         * @public
         * @function AvayaRecordingClient.Services.AuthenticationService#turnToUserModeCallbacks
         * @group Callbacks
         */
        this.turnToUserModeCallbacks = $.Callbacks().add(function () {
                this._isLoggedIn = true;
            });
    }

    /**
     * @function AvayaRecordingClient.Services.AuthenticationService#isLoggedIn
     * @memberOf AvayaRecordingClient.Services.AuthenticationService
     * @desc Is Authentication Service instance started or not
     * @public
     * @returns {boolean}
     */
    AuthenticationService.prototype.isLoggedIn = function () {
        return this._isLoggedIn;
    };

    /**
     * @function AvayaRecordingClient.Services.AuthenticationService#login
     * @memberOf AvayaRecordingClient.Services.AuthenticationService
     * @desc Obtain service token from UPS every some time and keep it fresh in local storage
     * @public
     * @param {string} [authToken] UPS auth token. If you try to relogin.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationService.prototype.login = function (authToken) {
        var self = this;

        return this._provider.getToken(authToken).then(function (response) {
            window.localStorage.ACSR_TOKEN = response.token;
            window.localStorage.ACSR_TIMESTAMP = response.timestamp;
            self.turnToUserModeCallbacks.fire();
            self._provider.startTokenDaemon(self.turnToGuestModeCallbacks);
            arcLogger.log('Recording Authentication Service: login success! %o', response);
            return $.Deferred().resolve(response).promise();
        }).fail(function (response) {
            return $.Deferred().reject(response).promise();
        });
    };

    /**
     * @function AvayaRecordingClient.Services.AuthenticationService#logout
     * @memberOf AvayaRecordingClient.Services.AuthenticationService
     * @desc Stop authentication service
     * @public
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationService.prototype.logout = function () {
        arcLogger.log('Recording Authentication Service: logout!');
        this._provider.logout(this.turnToGuestModeCallbacks);
        return $.Deferred().resolve().promise();
    };

    AvayaRecordingClient.Services.AuthenticationService = AuthenticationService;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Authentication.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaRecordingClient.Providers.Authentication.Validators
     * @define AvayaRecordingClient.Providers.Authentication.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
        this._name = 'AvayaRecordingClient.Providers.Authentication.Validators.PlainValidator';
    }

    PlainValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    AvayaRecordingClient.Providers.Authentication.Validators.PlainValidator = PlainValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for ASSR(API 2.0) server
     * @private
     * @memberOf AvayaRecordingClient.Providers.Authentication
     * @define AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider
     */
    function AuthenticationServerProvider() {
        AvayaRecordingClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider';
    }

    AuthenticationServerProvider.prototype = Object.create(AvayaRecordingClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider#getASCRToken
     * @memberOf AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider
     * @desc stub method
     * @private
     * @param {Object} opts - jQuery ajax options object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationServerProvider.prototype.getASCRToken = function (opts) {
        arcLogger.debug(this._name + '#getASCRToken: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.TokenResponse('OK', response.token, response.snapshotTimestamp);
        }, function (response) {
            arcLogger.warn(self._name + '#getASCRToken::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.TokenResponse(response.status, response.statusText);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider#convertObjectToServerObject
     * @memberOf AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider
     * @desc Convert object to server format
     * @private
     * @param {Object} obj - SDK object
     * @returns {Object}
     */
    AuthenticationServerProvider.prototype.convertObjectToServerObject = function (obj) {
        return JSON.stringify(obj).replace(/_(\w+)/g, '$1').replace(/"(\w+)"/g, function (x, y) {
            return '"' + y.charAt(0).toUpperCase() + y.slice(1) + '"';
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider#convertObjectToSdkObject
     * @memberOf AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} obj - JSON object from server
     * @returns {Object}
     */
    AuthenticationServerProvider.prototype.convertObjectToSdkObject = function (obj) {
        var sdkObj = JSON.parse(obj);
        return sdkObj;
    };

    AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider = AuthenticationServerProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Authentication.ServerProvider
     * @classdesc SDK API layer. Main implementation class for Recording Authentication Service
     * @private
     * @memberOf AvayaRecordingClient.Providers.Authentication
     * @define AvayaRecordingClient.Providers.Authentication.AuthenticationClientProvider
     * @param {AvayaRecordingClient.Config.ServerInfo} serverInfo
     */
    function AuthenticationClientProvider(serverInfo) {

        AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider.call(this);

        this._name = 'AvayaRecordingClient.Providers.Authentication.AuthenticationClientProvider';

        /**
         * @private
         * @type {AvayaRecordingClient.Providers.Authentication.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaRecordingClient.Providers.Authentication.Validators.PlainValidator();

        /**
         * @private
         * @type {number}
         */
        this._tokenRefreshPeriod = 900000;

        /**
         * @private
         * @type {timer}
         */
        this._timer = undefined;

        /**
         * @private
         * @type {string}
         */
        this._baseUrl = (serverInfo.isSecure ? 'https://' : 'http://') + serverInfo.host + ':' + serverInfo.port;

        /**
         * @private
         * @type {string}
         */
        this._authorizationUrl = serverInfo.resources.authorizationUrl;

        /**
         * @private
         * @type {string}
         */
        this._authToken = undefined;
    }

    AuthenticationClientProvider.prototype = Object.create(AvayaRecordingClient.Providers.Authentication.AuthenticationServerProvider.prototype);

    /**
     * @function AvayaRecordingClient.AuthenticationClientProvider#getToken
     * @memberOf AvayaRecordingClient.AuthenticationClientProvider
     * @desc Get token for ASCR {@AvayaRecordingClient.Base.Responses.TokenResponse} that is changed periodically
     * @private
     * @param {string} [authToken] UPS auth token. If you try to relogin.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationClientProvider.prototype.getToken = function (authToken) {
        var opts = {};

        opts.data = {
            tokenType : 'ACSR'
        };
        if(authToken){
            this._authToken = authToken;
        }
        opts.url = this._authorizationUrl;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaRecordingClient.Constants.CONTENT_TYPES.GET_TOKEN,
                AvayaRecordingClient.Constants.CONTENT_TYPES.GET_TOKEN_ERROR],
            'Authorization' : 'UPToken ' + this._authToken
        };
        return this.getASCRToken(opts);
    };

    /**
     * @function AvayaRecordingClient.AuthenticationClientProvider#startTokenDaemon
     * @memberOf AvayaRecordingClient.AuthenticationClientProvider
     * @desc Get token for ASCR that is changed periodically
     * @private
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationClientProvider.prototype.startTokenDaemon = function (turnToGuestModeCallbacks) {
        var self = this;
        var f = function () {
            self.getToken().done(function (response) {
                arcLogger.log('AvayaRecordingClient: Authentication token was refreshed');
                window.localStorage.ACSR_TOKEN = response.token;
                window.localStorage.ACSR_TIMESTAMP = response.timestamp;
                console.log(window.localStorage.ACSR_TOKEN);
            }).fail(function () {
                self.logout(turnToGuestModeCallbacks);
                arcLogger.log('AvayaRecordingClient: Authentication refresh fail. Switch to Guest mode');
            });
        };
        this._timer = setInterval(f, self._tokenRefreshPeriod);
    };

    /**
     * @function AvayaRecordingClient.AuthenticationClientProvider#stopTokenDaemon
     * @memberOf AvayaRecordingClient.AuthenticationClientProvider
     * @desc Stop autoupdate token process
     * @private
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationClientProvider.prototype.stopTokenDaemon = function () {
        if (this._timer) {
            clearInterval(this._timer);
        }
    };

    /**
     * @function AvayaRecordingClient.AuthenticationClientProvider#logout
     * @memberOf AvayaRecordingClient.AuthenticationClientProvider
     * @desc Switch flags, fire events for turning to guest mode
     * @private
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    AuthenticationClientProvider.prototype.logout = function (turnToGuestModeCallbacks) {
        window.localStorage.removeItem('ACSR_TOKEN');
        window.localStorage.removeItem('ACSR_TIMESTAMP');
        turnToGuestModeCallbacks.fire();
        this.stopTokenDaemon();
    };

    AvayaRecordingClient.Providers.Authentication.AuthenticationClientProvider = AuthenticationClientProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function ($, AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Program Service class that contains methods for obtaining recordings list by different criterias.
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Services
     * @define AvayaRecordingClient.Services.ProgramService
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources - object with program resources paths
     */
    function ProgramService(resources) {

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaRecordingClient.Providers.Program}
         */
        this._provider = new AvayaRecordingClient.Providers.Program.ProgramClientProvider(resources);
    }

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getRecordedPrograms
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Recorded/VOD Programs
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getRecordedPrograms = function (programParams) {
        return this._provider.getRecordedPrograms(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getRecordedProgramsByCategory
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Recorded/VOD Programs
     * @public
     * @param {String} categoryId - Id of the category
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getRecordedProgramsByCategory = function (categoryId, programParams) {
        return this._provider.getRecordedProgramsByCategory(categoryId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getRecordedProgramsByPublisher
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Recorded/VOD programs by Publisher
     * @public
     * @param {String} ownerId - Owner's Id
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getRecordedProgramsByPublisher = function (ownerId, programParams) {
        return this._provider.getRecordedProgramsByPublisher(ownerId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getAllBroadcasts
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get All Current and Schedule Live Broadcasts
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting broadcasts.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getAllBroadcasts = function (programParams) {
        return this._provider.getAllBroadcasts(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getFutureLiveBroadcasts
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Future Live Broadcasts
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting broadcasts.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getFutureLiveBroadcasts = function (programParams) {
        return this._provider.getFutureLiveBroadcasts(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getTodayBroadcasts
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Today's Current Live Broadcasts
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting broadcasts.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getTodayBroadcasts = function (programParams) {
        return this._provider.getTodayBroadcasts(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getOngoingBroadcasts
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Current Live Broadcasts
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting broadcasts.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getOngoingBroadcasts = function (programParams) {
        return this._provider.getOngoingBroadcasts(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getProgramPlaybackAddressDetails
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get an Individual Program's playback address details
     * @public
     * @param {string} programId - Id of the program
     * @param {string} [password] - password of the program if needed
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getProgramPlaybackAddressDetails = function (programId, password, programParams) {
        return this._provider.getProgramPlaybackAddressDetails(programId, password, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#reportProgramView
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Report Program View
     * @public
     * @param {string} programId - Id of the program
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for report.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.reportProgramView = function (programId, programParams) {
        return this._provider.reportProgramView(programId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#reportEndProgramView
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Report Program View
     * @public
     * @param {string} programId - Id of the program
     * @param {string} reportId - Id of report returned from [reportProgramView]{@link AvayaRecordingClient.Services.ProgramService#reportProgramView}
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for report.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.reportEndProgramView = function (programId, reportId, programParams) {
        return this._provider.reportEndProgramView(programId, reportId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getProgram
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get an Individual Program
     * @public
     * @param {string} programId - Id of the program
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getProgram = function (programId, programParams) {
        return this._provider.getProgram(programId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getDnId
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get an dnId
     * @public
     * @param {String} dnAddress - dnAddress
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getDnId = function (dnAddress) {
        return this._provider.getDnId(dnAddress);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getPasswordProtectedProgram
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get a Password Protected Program
     * @public
     * @param {string} programId - Id of the program
     * @param {string} password - password of the program
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getPasswordProtectedProgram = function (programId, password, programParams) {
        return this._provider.getPasswordProtectedProgram(programId, password, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getAllCategories
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get All Categories
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getAllCategories = function (programParams) {
        return this._provider.getAllCategories(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getCategory
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get an Individual Category
     * @public
     * @param {string} categoryId - Id of the category
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getCategory = function (categoryId, programParams) {
        return this._provider.getCategory(categoryId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getProgramStatus
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get Status of Program
     * @public
     * @param {string} programId - Id of the program
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getProgramStatus = function (programId, programParams) {
        return this._provider.getProgramStatus(programId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getAllTemplates
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get All Program Templates
     * @public
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getAllTemplates = function (programParams) {
        return this._provider.getAllTemplates(programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#getTemplate
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Get an Individual Program Template
     * @public
     * @param {string} templateId - Id of the template
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.getTemplate = function (templateId, programParams) {
        return this._provider.getTemplate(templateId, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#updateProgram
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Edit program
     * @public
     * @param {string} programId - Id of the template
     * @param {AvayaRecordingClient.Services.ProgramService.Program} program - object with changes
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.updateProgram = function (programId, program, programParams) {
        return this._provider.updateProgram(programId, program, programParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ProgramService#deleteProgram
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @desc Delete Program
     * @public
     * @param {string} programId - Id of the program
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams - params for getting programs
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramService.prototype.deleteProgram = function (programId, programParams) {
        return this._provider.deleteProgram(programId, programParams);
    };

    AvayaRecordingClient.Services.ProgramService = ProgramService;
})(jQuery, AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Possible params list for recordings requests
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.ProgramParams
     * @param {Object|undefined} programParams - object with program parameters
     */
    function ProgramParams(programParams) {
        if (programParams) {
            /**
             * @public
             * @type {string}
             * @desc Filter programs by tenant. This parameter is implicit in the authentication token. A tenant other than that of the authenticated user may be specified, in which case results will be limited to public recordings within that tenant.
             */
            this.tenantId = programParams.tenantId || undefined;
            /**
             * @public
             * @type {string}
             * @desc Search query. Matches:name, description
             */
            this.query = programParams.query || undefined;
            /**
             * @public
             * @type {string}
             * @desc Paging offset. Defaults to 0
             */
            this.offset = programParams.offset || undefined;
            /**
             * @public
             * @type {string}
             * @desc Number of results to return. Defaults to 20
             */
            this.count = programParams.count || undefined;
            /**
             * @public
             * @type {string}
             * @desc Sort order.
             */
            this.orderBy = programParams.orderBy || undefined;
            /**
             * @public
             * @type {string}
             * @desc Second sort order. "orderBy" must be present if using this field.
             */
            this.orderBy2 = programParams.orderBy2 || undefined;
            /**
             * @public
             * @type {string}
             * @desc Filter programs by category.
             */
            this.category = programParams.category || undefined;
            /**
             * @public
             * @type {string}
             * @desc Filter programs by user.
             */
            this.user = programParams.user || undefined;
            /**
             * @public
             * @type {string}
             * @desc Id of the Distribution Node used for playback
             */
            this.dnid = programParams.dnid || undefined;
            /**
             * @public
             * @type {number}
             * @desc Id of the Distribution Node used for report playback
             */
            this.dnId = programParams.dnId || undefined;
            /**
             * @public
             * @type {string}
             * @desc Defaults to true. If true, media associated with the program will be deleted in addition to the Program
             */
            this.deleteResources = programParams.deleteResources || undefined;
            /**
             * @public
             * @type {string}
             * @desc Defaults to false. If false, and the program is a recording, the recording is place in the recycle bin. Otherwise it is permanently deleted.
             */
            this.permanent = programParams.permanent || undefined;
            /**
             * @public
             * @type {string}
             * @desc Filter programs by user.
             */
            this.ownerId = programParams.ownerId || undefined;
            /**
             * @public
             * @type {boolean}
             * @desc Only include deleted programs (recycle bin) in results. Defaults to false.
             */
            this.onlyDeleted = programParams.onlyDeleted || false;
            /**
             * @public
             * @type {number}
             * @desc The timezone offset for the client, specified as the number of minutes that need to be added to the client's time to align it with UTC
             */
            this.timezoneOffset = programParams.timezoneOffset || undefined;
        }
    }

    ProgramParams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    AvayaRecordingClient.Services.ProgramService.ProgramParams = ProgramParams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * General Program  object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.Program
     * @param {Object|undefined} program - object with program properties
     */
    function Program(program) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof program !== 'undefined' && program !== null) {
            this._self = program.self || '';
            this._id = program.id || '';
            this._name = program.name || '';
            this._description = program.description || '';
            this._dnAddress = program.dnAddress || '';
            this._accessMode = program.accessMode || '';
            this._thumbnail = program.thumbnail || '';
            this._duration = program.duration || '';
            this._viewCount = program.viewCount || '';
            this._currentViewerCount = program.currentViewerCount || '';
            this._category = program.category || '';
            this._creationDate = program.creationDate || '';
            this._expirationDate = program.expirationDate || '';
            this._startDate = program.startDate || '';
            this._statusUrl = program.statusUrl || '';
            this._passwordProtected = program.passwordProtected || false;
            this._authorizeUrl = program.authorizeUrl || '';
            this._owner = program.owner || '';
            this._size = program.size || '';
            this._mediaType = program.mediaType || '';
            this._password = program.password || '';
            this._deletedDate = program.deletedDate || '';
            this._deleted = program.deleted || false;
            this._moderatorPinProtected = program.moderatorPinProtected || false;
            //Superset
            this._accessUsers = program.accessUsers || [];
            this._allowMediaDownload = program.allowMediaDownload || false;
            this._available = program.available || true;
            this._canEdit = program.canEdit || false;
            this._chatEnabled = program.hasOwnProperty('chatEnabled') ? program.chatEnabled : true;
            this._conferenceAddress = program.conferenceAddress || '';
            this._distributeToCDN = program.distributeToCDN || false;
            this._height = program.height || '';
            this._ownerDisplayName = program.ownerDisplayName || '';
            this._public = program.public || false;
            this._record = program.record || true;
            this._stream = program.stream || false;
            this._tenantId = program.tenantId || '';
            this._width = program.width || '';
            this._accessDenied = program.accessDenied || false;
            this._live = program.live || false;
            this._started = program.started || false;
            this._thumbnailData = program.thumbnailData || '';
            this._thumbnailMimeType = program.thumbnailMimeType || '';
            this._reportUrl = program.reportUrl || '';
            this._templateId = program.templateId || '';
            this._moderatorPin = program.moderatorPin || '';
            this._participantUsers = program.participantUsers || [];
            this._md5Hash = program.md5Hash || '';
            this._bitrate = program.bitrate || '';
            this._programStatus = program.programStatus || '';
        } else {
            this._self = '';
            this._id = '';
            this._name = '';
            this._description = '';
            this._accessMode = '';
            this._thumbnail = '';
            this._duration = '';
            this._viewCount = '';
            this._currentViewerCount = '';
            this._category = '';
            this._creationDate = '';
            this._expirationDate = '';
            this._startDate = '';
            this._statusUrl = '';
            this._passwordProtected = false;
            this._authorizeUrl = '';
            this._owner = '';
            this._size = '';
            this._mediaType = 0;
            this._password = 0;
            this._deletedDate = '';
            this._deleted = false;
            this._moderatorPinProtected = false;
            //Superset
            this._accessUsers = [];
            this._allowMediaDownload = false;
            this._available = true;
            this._canEdit = false;
            this._chatEnabled = true;
            this._conferenceAddress = '';
            this._distributeToCDN = false;
            this._height = '';
            this._ownerDisplayName = '';
            this._public = false;
            this._record = true;
            this._stream = false;
            this._tenantId = '';
            this._width = '';
            this._accessDenied = false;
            this._live = false;
            this._started = false;
            this._thumbnailData = '';
            this._thumbnailMimeType = '';
            this._reportUrl = '';
            this._templateId = '';
            this._moderatorPin = '';
            this._participantUsers = [];
            this._md5Hash = '';
            this._bitrate = '';
            this._programStatus = '';
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.ProgramValidator();
    }

    Program.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name self
     * @desc Relative URL to Program
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'self', {
        get : function () {
            return this._self;
        },
        set : function (val) {
            this._self = val;
        }
    });

    /**
     * @instance
     * @name id
     * @desc GUID for the Program
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc Display Name
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc Description
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name dnAddress
     * @desc dnAddress
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'dnAddress', {
        get : function () {
            return this._dnAddress;
        },
        set : function (val) {
            this._dnAddress = val;
        }
    });

    /**
     * @instance
     * @name tenantId
     * @desc Reference to Tenant this program belongs to
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'tenantId', {
        get : function () {
            return this._tenantId;
        },
        set : function (val) {
            this._tenantId = val;
        }
    });

    /**
     * @instance
     * @name accessMode
     * @desc The access mode for the program.  Must be one of the following values:
     *       PRIVATE - the program can only be accessed by the owner.
     *       USER_LIST - the program can only be accessed by the users specified in accessUsers (see Program)
     *       ALL_USERS - the program can be accessed by any logged-in user.
     *       PUBLIC - the program can be accessed bycluding guests
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'accessMode', {
        get : function () {
            return this._accessMode;
        },
        set : function (val) {
            this._accessMode = val;
        }
    });

    /**
     * @instance
     * @name thumbnail
     * @desc Relatvie URL of the Program's thumbnail
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'thumbnail', {
        get : function () {
            return this._thumbnail;
        },
        set : function (val) {
            this._thumbnail = val;
        }
    });

    /**
     * @instance
     * @name duration
     * @desc Duration of media in seconds
     * @type {string|number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'duration', {
        get : function () {
            return this._duration;
        },
        set : function (val) {
            this._duration = val;
        }
    });

    /**
     * @instance
     * @name viewCount
     * @desc Number of times a program has been viewed
     * @type {string|number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'viewCount', {
        get : function () {
            return this._viewCount;
        },
        set : function (val) {
            this._viewCount = val;
        }
    });

    /**
     * @instance
     * @name currentViewerCount
     * @desc Number of people currently viewing the program.
     * @type {string|number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'currentViewerCount', {
        get : function () {
            return this._currentViewerCount;
        },
        set : function (val) {
            this._currentViewerCount = val;
        }
    });

    /**
     * @instance
     * @name category
     * @desc Display Name of Category
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'category', {
        get : function () {
            return this._category;
        },
        set : function (val) {
            this._category = val;
        }
    });

    /**
     * @instance
     * @name creationDate
     * @desc Date program was created
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'creationDate', {
        get : function () {
            return this._creationDate;
        },
        set : function (val) {
            this._creationDate = val;
        }
    });

    /**
     * @instance
     * @name expirationDate
     * @desc Date program will be expired
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'expirationDate', {
        get : function () {
            return this._expirationDate;
        },
        set : function (val) {
            this._expirationDate = val;
        }
    });


    /**
     * @instance
     * @name startDate
     * @desc Estimated start date of live broadcast
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'startDate', {
        get : function () {
            return this._startDate;
        },
        set : function (val) {
            this._startDate = val;
        }
    });

    /**
     * @instance
     * @name statusUrl
     * @desc Relative URL for getting program status
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'statusUrl', {
        get : function () {
            return this._statusUrl;
        },
        set : function (val) {
            this._statusUrl = val;
        }
    });

    /**
     * @instance
     * @name passwordProtected
     * @desc If true, the program is PIN/password protected
     * @type {string|boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'passwordProtected', {
        get : function () {
            return this._passwordProtected;
        },
        set : function (val) {
            this._passwordProtected = val;
        }
    });

    /**
     * @instance
     * @name authorizeUrl
     * @desc Relative URL to get access to a password protected program. Only returned for password protected programs.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'authorizeUrl', {
        get : function () {
            return this._authorizeUrl;
        },
        set : function (val) {
            this._authorizeUrl = val;
        }
    });

    /**
     * @instance
     * @name owner
     * @desc Username of owner
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'owner', {
        get : function () {
            return this._owner;
        },
        set : function (val) {
            this._owner = val;
        }
    });

    /**
     * @instance
     * @name size
     * @desc If the program is complete, the size of the recording plus any related resources. Units of kilobytes.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'size', {
        get : function () {
            return this._size;
        },
        set : function (val) {
            this._size = val;
        }
    });

    /**
     * @instance
     * @name mediaType
     * @desc Return programs of a certain media type.
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'mediaType', {
        get : function () {
            return this._mediaType;
        },
        set : function (val) {
            this._mediaType = val;
        }
    });

    /**
     * @instance
     * @name accessUsers
     * @desc A list of all the usernames for the users that should be allowed to access this program.
    Each name must be a valid user for the tenant that the program belongs to.
    Has no effect unless accessMode is configured to USER_LIST
     * @type {string[]}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'accessUsers', {
        get : function () {
            return this._accessUsers;
        },
        set : function (accessUsers) {
            this._accessUsers = [];
            if (accessUsers) {
                if (Array.isArray(accessUsers)) {
                    this._accessUsers = accessUsers;
                }
            }
        }
    });

    /**
     * @instance
     * @name allowMediaDownload
     * @desc If true, users are allowed to download the program media
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'allowMediaDownload', {
        get : function () {
            return this._allowMediaDownload;
        },
        set : function (val) {
            this._allowMediaDownload = val;
        }
    });

    /**
     * @instance
     * @name available
     * @desc If true, the program is available to stream.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'available', {
        get : function () {
            return this._available;
        },
        set : function (val) {
            this._available = val;
        }
    });

    /**
     * @instance
     * @name canEdit
     * @desc If true, the program is editable
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'canEdit', {
        get : function () {
            return this._canEdit;
        },
        set : function (val) {
            this._canEdit = val;
        }
    });

    /**
     * @instance
     * @name chatEnabled
     * @desc Whether or not chat/Q&A is enabled for a session. Defaults to true
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'chatEnabled', {
        get : function () {
            return this._chatEnabled;
        },
        set : function (val) {
            this._chatEnabled = val;
        }
    });

    /**
     * @instance
     * @name conferenceAddress
     * @desc Conference Address
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'conferenceAddress', {
        get : function () {
            return this._conferenceAddress;
        },
        set : function (val) {
            this._conferenceAddress = val;
        }
    });

    /**
     * @instance
     * @name distributeToCDN
     * @desc If true, the program will be/is distributed to the CDN
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'distributeToCDN', {
        get : function () {
            return this._distributeToCDN;
        },
        set : function (val) {
            this._distributeToCDN = val;
        }
    });

    /**
     * @instance
     * @name ownerDisplayName
     * @desc Owner display name
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'ownerDisplayName', {
        get : function () {
            return this._ownerDisplayName;
        },
        set : function (val) {
            this._ownerDisplayName = val;
        }
    });

    /**
     * @instance
     * @name height
     * @desc Program height
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'height', {
        get : function () {
            return this._height;
        },
        set : function (val) {
            this._height = val;
        }
    });

    /**
     * @instance
     * @name width
     * @desc Program width
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'width', {
        get : function () {
            return this._width;
        },
        set : function (val) {
            this._width = val;
        }
    });

    /**
     * @instance
     * @name accessDenied
     * @desc If true, the program cannot be played due to the client's location.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'accessDenied', {
        get : function () {
            return this._accessDenied;
        },
        set : function (val) {
            this._accessDenied = val;
        }
    });

    /**
     * @instance
     * @name live
     * @desc 	If true, the program represents a live broadcast. If false, the program represents a recording/VOD.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'live', {
        get : function () {
            return this._live;
        },
        set : function (val) {
            this._live = val;
        }
    });

    /**
     * @instance
     * @name started
     * @desc Only present for live programs. If true, the broadcast has started.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'started', {
        get : function () {
            return this._started;
        },
        set : function (val) {
            this._started = val;
        }
    });

    /**
     * @instance
     * @name thumbnailData
     * @desc Base64 encoded thumbnail image data
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'thumbnailData', {
        get : function () {
            return this._thumbnailData;
        },
        set : function (val) {
            this._thumbnailData = val;
        }
    });

    /**
     * @instance
     * @name thumbnailMimeType
     * @desc MIME Type of thumbnailData. Supported mime types: image/jpeg, image/png, image/gif
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'thumbnailMimeType', {
        get : function () {
            return this._thumbnailMimeType;
        },
        set : function (val) {
            this._thumbnailMimeType = val;
        }
    });

    /**
     * @instance
     * @name reportUrl
     * @desc Relative URL used to report a program view has taken place.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'reportUrl', {
        get : function () {
            return this._reportUrl;
        },
        set : function (val) {
            this._reportUrl = val;
        }
    });

    /**
     * @instance
     * @name templateId
     * @desc The id for the vnd.avaya.asr.program.template.v2+json of this Program.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'templateId', {
        get : function () {
            return this._templateId;
        },
        set : function (val) {
            this._templateId = val;
        }
    });

    /**
     * @instance
     * @name moderatorPin
     * @desc If present, allows an individual other than the conference owner to use moderator chat / Q&A APIs. In requests, for security reaons, the moderator pin will be masked if present
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'moderatorPin', {
        get : function () {
            return this._moderatorPin;
        },
        set : function (val) {
            this._moderatorPin = val;
        }
    });

    /**
     * @instance
     * @name participantUsers
     * @desc A list of all the usernames for the users who participated in the program. Each name must be a valid user for the tenant that the program belongs to..
     * @type {string[]}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'participantUsers', {
        get : function () {
            return this._participantUsers;
        },
        set : function (participantUsers) {
            this._participantUsers = [];
            if (participantUsers) {
                if (Array.isArray(participantUsers)) {
                    this._participantUsers = participantUsers;
                }
            }
        }
    });

    /**
     * @instance
     * @name md5Hash
     * @desc Am md5 checksum of the recording mp4 file which can be used to validate the download.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'md5Hash', {
        get : function () {
            return this._md5Hash;
        },
        set : function (val) {
            this._md5Hash = val;
        }
    });

    /**
     * @instance
     * @name public
     * @desc Determines if a broadcast will appear in the portal for those users who are authorised to view it.
     *       If this is false, then authorised users will still be able to access it from a direct link,
     *       but it will not appear in the portal.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'public', {
        get : function () {
            return this._public;
        },
        set : function (val) {
            this._public = val;
        }
    });

    /**
     * @instance
     * @name password
     * @desc Program PIN/password
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'password', {
        get : function () {
            return this._password;
        },
        set : function (val) {
            this._password = val;
        }
    });

    /**
     * @instance
     * @name deletedDate
     * @desc If the program has been deleted (is in recycle bin), this is the date it was placed there. If the recording is restored this date is blanked.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'deletedDate', {
        get : function () {
            return this._deletedDate;
        },
        set : function (val) {
            this._deletedDate = val;
        }
    });

    /**
     * @instance
     * @name deleted
     * @desc Indicates if the program has been (or should be) deleted and placed in the recycle bin.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'deleted', {
        get : function () {
            return this._deleted;
        },
        set : function (val) {
            this._deleted = val;
        }
    });

    /**
     * @instance
     * @name moderatorPinProtected
     * @desc If true, the program's chat is moderator PIN protected
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'moderatorPinProtected', {
        get : function () {
            return this._moderatorPinProtected;
        },
        set : function (val) {
            this._moderatorPinProtected = val;
        }
    });




    /**
     * @instance
     * @name bitrate
     * @desc recording's bitrate
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'bitrate', {
        get : function () {
            return this._bitrate;
        },
        set : function (val) {
            this._bitrate = val;
        }
    });

    /**
     * @instance
     * @name bitrate
     * @desc recording's bitrate
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Program
     */
    Object.defineProperty(Program.prototype, 'programStatus', {
        get : function () {
            return this._programStatus;
        }
    });

    AvayaRecordingClient.Services.ProgramService.Program = Program;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * General Programm object object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.Category
     * @param {Object|undefined} category - object with category properties
     */
    function Category(category) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof category !== 'undefined' && category !== null) {
            this._self = category.self || '';
            this._id = category.id || '';
            this._name = category.name || '';
            this._programsUrl = category.programsUrl || '';
            this._tenants = category.tenants || [];
            this._tenants = [];
            if (category.tenants) {
                if (Array.isArray(category.tenants)) {
                    this._tenants = category.tenants;
                }
            }
        } else {
            this._self = '';
            this._id = '';
            this._name = '';
            this._programsUrl = '';
            this._tenants = [];
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.CategoryValidator();
    }

    Category.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name self
     * @desc Relative URL to get this Category
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Category
     */
    Object.defineProperty(Category.prototype, 'self', {
        get : function () {
            return this._self;
        },
        set : function (val) {
            this._self = val;
        }
    });

    /**
     * @instance
     * @name id
     * @desc Id of the Category
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Category
     */
    Object.defineProperty(Category.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc Display Name of the Category
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Category
     */
    Object.defineProperty(Category.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    /**
     * @instance
     * @name programsUrl
     * @desc Relative URL for getting programs associated with this Category.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Category
     */
    Object.defineProperty(Category.prototype, 'programsUrl', {
        get : function () {
            return this._programsUrl;
        },
        set : function (val) {
            this._programsUrl = val;
        }
    });

    /**
     * @instance
     * @name tenants
     * @desc List of ids for Tenants that are allowed to use this Category.
     * @type {string[]}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Category
     */
    Object.defineProperty(Category.prototype, 'tenants', {
        get : function () {
            return this._tenants;
        },
        set : function (val) {
            this._tenants = [];
            if (val) {
                if (Array.isArray(val)) {
                    this._tenants = val;
                }
            }
        }
    });

    AvayaRecordingClient.Services.ProgramService.Category = Category;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Template object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.Template
     * @param {Object|undefined} template - object with template properties
     */
    function Template(template) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof template !== 'undefined' && template !== null) {
            this._self = template.self || '';
            this._id = template.id || '';
            this._name = template.name || '';
            this._description = template.description || '';
            this._callBitrate = template.callBitrate || '';
            this._callWidth = template.callWidth || '';
            this._callHeight = template.callHeight || '';
            this._tenants = [];
            if (template.tenants) {
                if (Array.isArray(template.tenants)) {
                    this._tenants = template.tenants;
                }
            }
        } else {
            this._self = '';
            this._id = '';
            this._name = '';
            this._description = '';
            this._callBitrate = '';
            this._callWidth = '';
            this._callHeight = '';
            this._tenants = [];
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.TemplateValidator();
    }

    Template.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name self
     * @desc Relative URL to get this Template
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'self', {
        get : function () {
            return this._self;
        },
        set : function (val) {
            this._self = val;
        }
    });

    /**
     * @instance
     * @name id
     * @desc Id of the Template
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc Display Name of the Template
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc Description of the Template
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name callBitrate
     * @desc H.323 call bitrate
     * @type {integer}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'callBitrate', {
        get : function () {
            return this._callBitrate;
        },
        set : function (val) {
            this._callBitrate = val;
        }
    });

    /**
     * @instance
     * @name callWidth
     * @desc Width of the call video
     * @type {integer}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'callWidth', {
        get : function () {
            return this._callWidth;
        },
        set : function (val) {
            this._callWidth = val;
        }
    });

    /**
     * @instance
     * @name callHeight
     * @desc Height of the call video
     * @type {integer}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'callHeight', {
        get : function () {
            return this._callHeight;
        },
        set : function (val) {
            this._callHeight = val;
        }
    });

    /**
     * @instance
     * @name tenants
     * @desc List of ids for Tenants that are allowed to use this Template.
     * @type {string[]}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Template
     */
    Object.defineProperty(Template.prototype, 'tenants', {
        get : function () {
            return this._tenants;
        },
        set : function (tenants) {
            this._tenants = [];
            if (tenants) {
                if (Array.isArray(tenants)) {
                    this._tenants = tenants;
                }
            }
        }
    });

    AvayaRecordingClient.Services.ProgramService.Template = Template;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * List of {@link AvayaRecordingClient.Services.ProgramService.Program}
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.PagedList
     * @param {Object|undefined} pagedList - object with pagedList properties
     */
    function PagedList(pagedList) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof pagedList !== 'undefined' && pagedList !== null) {
            this._items = pagedList.items || [];
            this._totalItemCount = pagedList.totalItemCount || '';
        } else {
            this._items = [];
            this._totalItemCount = '';
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.PagedListValidator();
    }

    PagedList.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name items
     * @desc 	Array of Items Size of array is at most the amount of items requested.
     * @type {AvayaRecordingClient.Services.ProgramService.Program[]}
     * @memberOf AvayaRecordingClient.Services.ProgramService.PagedList
     */
    Object.defineProperty(PagedList.prototype, 'items', {
        get : function () {
            return this._items;
        },
        set : function (val) {
            this._items = [];
            if (val) {
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        this._items.push(new AvayaRecordingClient.Services.ProgramService.Program(val[i]));
                    }
                } else {
                    this._items.push(new AvayaRecordingClient.Services.ProgramService.Program(val));
                }
            }
        }
    });

    /**
     * @instance
     * @name totalItemCount
     * @desc 	Total number of items on the server. totalItemCount >= items.length
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ProgramService.PagedList
     */
    Object.defineProperty(PagedList.prototype, 'totalItemCount', {
        get : function () {
            return this._totalItemCount;
        },
        set : function (val) {
            this._totalItemCount = val;
        }
    });

    AvayaRecordingClient.Services.ProgramService.PagedList = PagedList;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Stream info
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.Streams
     * @param {Object|undefined} streams - object with streams properties
     */
    function Streams(streams) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof streams !== 'undefined' && streams !== null) {
            this._primaryMediaUrl = streams.primaryMediaUrl || '';
            this._primaryMediaHlsUrl = streams.primaryMediaHlsUrl || '';
        } else {
            this._primaryMediaUrl = '';
            this._primaryMediaHlsUrl = '';
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.StreamsValidator();
    }

    Streams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name primaryMediaUrl
     * @desc Direct, Absolute URL to the MMS/MP4 media on the DN or CDN
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Streams
     */
    Object.defineProperty(Streams.prototype, 'primaryMediaUrl', {
        get : function () {
            return this._primaryMediaUrl;
        },
        set : function (val) {
            this._primaryMediaUrl = val;
        }
    });

    /**
     * @instance
     * @name primaryMediaHlsUrl
     * @desc Direct, Absolute URL to the HLS media on the DN or CDN
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.Streams
     */
    Object.defineProperty(Streams.prototype, 'primaryMediaHlsUrl', {
        get : function () {
            return this._primaryMediaHlsUrl;
        },
        set : function (val) {
            this._primaryMediaHlsUrl = val;
        }
    });

    AvayaRecordingClient.Services.ProgramService.Streams = Streams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Get an Individual Program's playback address details
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.ProgramAddress
     * @param {Object|undefined} programAddress - object with programAddress properties
     */
    function ProgramAddress(programAddress) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof programAddress !== 'undefined' && programAddress !== null) {
            this._available = programAddress.available || '';
            this._downloadUrl = programAddress.downloadUrl || '';
            this._reportUrl = programAddress.reportUrl || '';

            this._playerPreference = [];
            if (programAddress.playerPreference) {
                if (Array.isArray(programAddress.playerPreference)) {
                    this._playerPreference = programAddress.playerPreference;
                }
            }

            this._streams = new AvayaRecordingClient.Services.ProgramService.Streams(programAddress.streams);
        } else {
            this._available = '';
            this._downloadUrl = '';
            this._reportUrl = '';
            this._playerPreference = [];
            this._streams = new AvayaRecordingClient.Services.ProgramService.Streams();
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.ProgramAddressValidator();
    }

    ProgramAddress.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name available
     * @desc If true, the program is available to stream.
     * @type {string|boolean}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramAddress
     */
    Object.defineProperty(ProgramAddress.prototype, 'available', {
        get : function () {
            return this._available;
        },
        set : function (val) {
            this._available = val;
        }
    });

    /**
     * @instance
     * @name downloadUrl
     * @desc URL to download the program media
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramAddress
     */
    Object.defineProperty(ProgramAddress.prototype, 'downloadUrl', {
        get : function () {
            return this._downloadUrl;
        },
        set : function (val) {
            this._downloadUrl = val;
        }
    });

    /**
     * @instance
     * @name reportUrl
     * @desc Relative URL used to report a program view has taken place.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramAddress
     */
    Object.defineProperty(ProgramAddress.prototype, 'reportUrl', {
        get : function () {
            return this._reportUrl;
        },
        set : function (val) {
            this._reportUrl = val;
        }
    });

    /**
     * @instance
     * @name playerPreference
     * @desc List of media layers in the preferred order.
     * @type {AvayaRecordingClient.Services.ProgramService.PlayerPreference[]}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramAddress
     */
    Object.defineProperty(ProgramAddress.prototype, 'playerPreference', {
        get : function () {
            return this._playerPreference;
        },
        set : function (playerPreference) {
            this._playerPreference = [];
            if (playerPreference) {
                if (Array.isArray(playerPreference)) {
                    this._playerPreference = playerPreference;
                }
            }
        }
    });

    /**
     * @instance
     * @name streams
     * @desc If programs is "available", provides a collection of URLs for the media associated with the Program
     * @type {AvayaRecordingClient.Services.ProgramService.PlayerPreference}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramAddress
     */
    Object.defineProperty(ProgramAddress.prototype, 'streams', {
        get : function () {
            return this._streams;
        },
        set : function (streams) {
            this._streams = new AvayaRecordingClient.Services.ProgramService.Streams(streams);
        }
    });

    AvayaRecordingClient.Services.ProgramService.ProgramAddress = ProgramAddress;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Program Status object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ProgramService
     * @define AvayaRecordingClient.Services.ProgramService.ProgramStatus
     * @param {Object|undefined} programStatus - object with programStatus properties
     */
    function ProgramStatus(programStatus) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof programStatus !== 'undefined' && programStatus !== null) {
            this._self = programStatus.self || '';
            this._programId = programStatus.programId || '';
            this._state = programStatus.state || '';
            this._stateDetails = programStatus.stateDetails || '';
            this._programCreationStage = programStatus.programCreationStage || '';
            this._programCreationMessage = programStatus.programCreationMessage || '';
            this._recordingState = programStatus.recordingState || '';
        } else {
            this._self = '';
            this._programId = '';
            this._state = '';
            this._stateDetails = '';
            this._programCreationStage = '';
            this._programCreationMessage = '';
            this._recordingState = '';
        }

        this._validator = new AvayaRecordingClient.Providers.Program.Validators.ProgramStatusValidator();
    }

    ProgramStatus.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name self
     * @desc Relative URL to get this object
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'self', {
        get : function () {
            return this._self;
        },
        set : function (val) {
            this._self = val;
        }
    });

    /**
     * @instance
     * @name programId
     * @desc Id of the program
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'programId', {
        get : function () {
            return this._programId;
        },
        set : function (val) {
            this._programId = val;
        }
    });

    /**
     * @instance
     * @name state
     * @desc Program State
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'state', {
        get : function () {
            return this._state;
        },
        set : function (val) {
            this._state = val;
        }
    });

    /**
     * @instance
     * @name stateDetails
     * @desc Any additional information on creation state, e.g. failed due to duration too short or due to failed connection
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'stateDetails', {
        get : function () {
            return this._stateDetails;
        },
        set : function (val) {
            this._stateDetails = val;
        }
    });

    /**
     * @instance
     * @name programCreationStage
     * @desc Program Creation Stage
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'programCreationStage', {
        get : function () {
            return this._programCreationStage;
        },
        set : function (val) {
            this._programCreationStage = val;
        }
    });

    /**
     * @instance
     * @name programCreationMessage
     * @desc Text message that corresponds to the current programCreationStage
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'programCreationMessage', {
        get : function () {
            return this._programCreationMessage;
        },
        set : function (val) {
            this._programCreationMessage = val;
        }
    });

    /**
     * @instance
     * @name recordingState
     * @desc Recording State
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ProgramService.ProgramStatus
     */
    Object.defineProperty(ProgramStatus.prototype, 'recordingState', {
        get : function () {
            return this._recordingState;
        },
        set : function (val) {
            this._recordingState = val;
        }
    });

    AvayaRecordingClient.Services.ProgramService.ProgramStatus = ProgramStatus;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for ASSR(API 2.0) server
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program
     * @define AvayaRecordingClient.Providers.Program.ProgramServerProvider
     */
    function ProgramServerProvider() {
        AvayaRecordingClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaRecordingClient.Providers.Program.ProgramServerProvider';
    }

    ProgramServerProvider.prototype = Object.create(AvayaRecordingClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getRecordedProgramsByOptions
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get Recorded/VOD Programs by some options
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getRecordedProgramsByOptions = function (opts) {
        arcLogger.debug(this._name + '#getRecordedProgramsByOptions: %o', opts);

        var self = this;

        opts.headers = {};

        opts.headers.Accept = [
            AvayaRecordingClient.Constants.CONTENT_TYPES.PAGED_LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'GET';

        return this.setCallbacksAndSend(opts, function (response) {
            var pagedList = self.convertProgramsArrayResponseToSdkArrayObject(response);
            return new AvayaRecordingClient.Base.Responses.QueryProgramResponse('OK', pagedList);
        }, function (response) {
            arcLogger.warn(self._name + '#getRecordedProgramsByOptions::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.QueryProgramResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getProgramDetailsByOptions
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get Recorded/VOD Programs by some options
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getProgramDetailsByOptions = function (opts) {
        arcLogger.debug(this._name + '#getProgramDetailsByOptions: %o', opts);

        var self = this;

        opts.headers = {};

        opts.headers.Accept = [
            AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM_ADDRESS,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'GET';

        return this.setCallbacksAndSend(opts, function (response) {
            var programAddress = self.convertResponseToProgramAddressSdkObject(response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', programAddress);
        }, function (response) {
            arcLogger.warn(self._name + '#getProgramDetailsByOptions::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getProgramDetailsByOptions
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get Recorded/VOD Programs by some options
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getPasswordProtectedProgramDetailsByOptions = function (opts) {
        arcLogger.debug(this._name + '#getPasswordProtectedProgramDetailsByOptions: %o', opts);

        var self = this;

        opts.headers = {};
        opts.headers['Content-Type'] = AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM_ADDRESS;
        opts.headers.Accept = [
            AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM_ADDRESS,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'POST';

        return this.setCallbacksAndSend(opts, function (response) {
            var programAddress = self.convertResponseToProgramAddressSdkObject(response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', programAddress);
        }, function (response) {
            arcLogger.warn(self._name + '#getProgramDetailsByOptions::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#postReportProgramView
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Report Program View
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.postReportProgramView = function (opts) {
        arcLogger.debug(this._name + '#postReportProgramView: %o', opts);

        var self = this;

        opts.headers.Accept = [
            AvayaRecordingClient.Constants.CONTENT_TYPES.REPORT,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'POST';

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response.receipt);
        }, function (response) {
            arcLogger.warn(self._name + '#postReportProgramView::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#postReportEndProgramView
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Report Program View
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.postReportEndProgramView = function (opts) {
        arcLogger.debug(this._name + '#postReportEndProgramView: %o', opts);

        var self = this;
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'POST';
        opts.async = false;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response);
        }, function (response) {
            arcLogger.warn(self._name + '#postReportEndProgramView::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getIndividualProgram
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get an Individual Program
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getIndividualProgram = function (opts) {
        arcLogger.debug(this._name + '#getIndividualProgram: %o', opts);

        var self = this;
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ProgramService.Program(response));
        }, function (response) {
            arcLogger.warn(self._name + '#getIndividualProgram::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getDnIdRequest
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get a dnId
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getDnIdRequest = function (opts) {
        arcLogger.debug(this._name + '#getDnIdRequest: %o', opts);

        var self = this;
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response);
        }, function (response) {
            arcLogger.warn(self._name + '#getDnIdRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getCategoryRequest
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get category or categories
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getCategoryRequest = function (opts) {
        arcLogger.debug(this._name + '#getCategoryRequest: %o', opts);

        var self = this,
        res;

        return this.setCallbacksAndSend(opts, function (response) {
            if (Array.isArray(response)) {
                res = [];

                for (var i = 0; i < response.length; i++) {
                    res.push(new AvayaRecordingClient.Services.ProgramService.Category(response[i]));
                }
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', {
                    categories : res
                });
            } else {
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ProgramService.Category(response));
            }
        }, function (response) {
            arcLogger.warn(self._name + '#getCategoryRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getProgramStatusRequest
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get Status of Program
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getProgramStatusRequest = function (opts) {
        arcLogger.debug(this._name + '#getProgramStatusRequest: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ProgramService.ProgramStatus(response));
        }, function (response) {
            arcLogger.warn(self._name + '#getProgramStatusRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#getTemplateRequest
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Get template or templates
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.getTemplateRequest = function (opts) {
        arcLogger.debug(this._name + '#getTemplateRequest: %o', opts);

        var self = this,
        res;

        return this.setCallbacksAndSend(opts, function (response) {
            if (Array.isArray(response)) {
                res = [];

                for (var i = 0; i < response.length; i++) {
                    res.push(new AvayaRecordingClient.Services.ProgramService.Template(response[i]));
                }
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', {
                    templates : res
                });
            } else {
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ProgramService.Template(response));
            }
        }, function (response) {
            arcLogger.warn(self._name + '#getTemplateRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#updateProgramRequest
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Edit Program
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.updateProgramRequest = function (opts) {
        arcLogger.debug(this._name + '#updateProgramRequest: %o', opts);

        var self = this;
        opts.data = this.convertObjectToServerObject(opts.data);

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ProgramService.Program(response));
        }, function (response) {
            arcLogger.warn(self._name + '#updateProgramRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#deleteProgramRequest
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Delete Program
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramServerProvider.prototype.deleteProgramRequest = function (opts) {
        arcLogger.debug(this._name + '#deleteProgramRequest: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response);
        }, function (response) {
            arcLogger.warn(self._name + '#deleteProgramRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#convertObjectToServerObject
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Convert object to server format
     * @private
     * @param {Object} obj - SDK object
     * @returns {Object}
     */
    ProgramServerProvider.prototype.convertObjectToServerObject = function (obj) {
        return JSON.stringify(obj).replace(/"_([0-9a-zA-Z-_]+)"/g, '"$1"').replace(/"validator":\{\},/g, '')
        .replace(/("(?!categoryId|password)[^"]+":""[,]*)|[,]*"(?!categoryId|password)[^"]+":""/g, '');
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#convertObjectToSdkObject
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} item - JSON object from server
     * @returns {AvayaRecordingClient.Services.ProgramService.Program}
     */
    ProgramServerProvider.prototype.convertObjectToSdkObject = function (item) {
        var sdkObj = new AvayaRecordingClient.Services.ProgramService.Program(item);
        return sdkObj;
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#convertProgramsArrayResponseToSdkArrayObject
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Re-form array object to SDK format
     * @private
     * @param {Object} response - JSON object from server
     * @returns {AvayaRecordingClient.Services.ProgramService.PagedList}
     */
    ProgramServerProvider.prototype.convertProgramsArrayResponseToSdkArrayObject = function (response) {
        arcLogger.log(this._name + '#convertProgramsArrayResponseToSdkArrayObject: %o', response);

        var self = this;

        var items = response.items.map(function (item) {
                return self.convertObjectToSdkObject(item);
            });

        return new AvayaRecordingClient.Services.ProgramService.PagedList({
            items : items,
            totalItemCount : response.totalItemCount
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramServerProvider#convertResponseToProgramAddressSdkObject
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramServerProvider
     * @desc Convert response object to ProgramAddress SDK object
     * @private
     * @param {Object} response - JSON object from server
     * @returns {AvayaRecordingClient.Services.ProgramService.ProgramAddress}
     */
    ProgramServerProvider.prototype.convertResponseToProgramAddressSdkObject = function (response) {
        var sdkObj = new AvayaRecordingClient.Services.ProgramService.ProgramAddress(response);
        return sdkObj;
    };

    AvayaRecordingClient.Providers.Program.ProgramServerProvider = ProgramServerProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Program.ServerProvider
     * @classdesc SDK API layer. Main implementation class for Recording Program Service
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program
     * @define AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources
     */
    function ProgramClientProvider(resources) {

        AvayaRecordingClient.Providers.Program.ProgramServerProvider.call(this);

        this._name = 'AvayaRecordingClient.Providers.Program.ProgramClientProvider';

        /**
         * @private
         * @type {string}
         */
        this._resources = resources;

        /**
         * @private
         * @type {AvayaRecordingClient.Providers.Program.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaRecordingClient.Providers.Program.Validators.PlainValidator();
    }

    ProgramClientProvider.prototype = Object.create(AvayaRecordingClient.Providers.Program.ProgramServerProvider.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getRecordedPrograms
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc stub method
     * @private
     * @param {string} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getRecordedPrograms = function (programParams) {
        arcLogger.debug(this._name + '#getRecordedPrograms: %s', programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getRecordedProgramsByCategory
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc stub method
     * @private
     * @param {number} categoryId
     * @param {string} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getRecordedProgramsByCategory = function (categoryId, programParams) {
        arcLogger.debug(this._name + '#getRecordedProgramsByCategory: %s : %o', categoryId, programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/category/' + categoryId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getRecordedProgramsByPublisher
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get Recorded/VOD programs by Publisher
     * @private
     * @param {number} ownerId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getRecordedProgramsByPublisher = function (ownerId, programParams) {
        arcLogger.debug(this._name + '#getRecordedProgramsByPublisher: %s : %o', ownerId, programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/publisher/' + ownerId + '/vod' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getFutureLiveBroadcasts
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get Future Live Broadcasts
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getFutureLiveBroadcasts = function (programParams) {
        arcLogger.debug(this._name + '#getFutureLiveBroadcasts: %o', programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/live/future' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getAllBroadcasts
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get All Current and Schedule Live Broadcasts
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getAllBroadcasts = function (programParams) {
        arcLogger.debug(this._name + '#getAllBroadcasts: %o', programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/live' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getTodayBroadcasts
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get Today's Current Live Broadcasts
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getTodayBroadcasts = function (programParams) {
        arcLogger.debug(this._name + '#getTodayBroadcasts: %o', programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/live/today' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getOngoingBroadcasts
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get Current Live Broadcasts
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getOngoingBroadcasts = function (programParams) {
        arcLogger.debug(this._name + '#getOngoingBroadcasts: %o', programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/live/now' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getRecordedProgramsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getProgramPlaybackAddressDetails
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get an Individual Program's playback address details
     * @private
     * @param {string} programId
     * @param {string} password
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getProgramPlaybackAddressDetails = function (programId, password, programParams) {
        arcLogger.debug(this._name + '#getProgramPlaybackAddressDetails: %s', programId);

        var opts = {};
        opts.data = this.convertObjectToServerObject({password: password});
        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/url' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        if(password) {
            return this.getPasswordProtectedProgramDetailsByOptions(opts);
        }
        return this.getProgramDetailsByOptions(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#reportProgramView
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Report Program View
     * @private
     * @param {string} programId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.reportProgramView = function (programId, programParams) {
        arcLogger.debug(this._name + '#reportProgramView: %s, %o', programId, programParams);

        var opts = {};
        opts.headers = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/report' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.postReportProgramView(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#reportEndProgramView
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Report End Program View
     * @private
     * @param {string} programId
     * @param {string} reportId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.reportEndProgramView = function (programId, reportId, programParams) {
        arcLogger.debug(this._name + '#reportEndProgramView: %s, %s, %o', programId, reportId, programParams);

        var opts = {};

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/report/' + reportId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.postReportEndProgramView(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getProgram
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get an Individual Program
     * @private
     * @param {string} programId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getProgram = function (programId, programParams) {
        arcLogger.debug(this._name + '#getProgram: %s, %o', programId, programParams);

        var opts = {};
        opts.headers = {};
        opts.method = 'GET';

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getIndividualProgram(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getDnId
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get a dnId
     * @private
     * @param {String} dnAddress - dnAddress
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getDnId = function (dnAddress) {
        arcLogger.debug(this._name + '#getDnId: %s, %o', dnAddress);

        var opts = {};
        opts.headers = {};
        opts.method = 'GET';

        opts.url = dnAddress;

        return this.getDnIdRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getPasswordProtectedProgram
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get a Password Protected Program
     * @private
     * @param {string} programId
     * @param {string} password
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getPasswordProtectedProgram = function (programId, password, programParams) {
        arcLogger.debug(this._name + '#getPasswordProtectedProgram: %s, %o', programId, programParams);

        var opts = {};
        opts.headers = {};
        opts.headers['Content-Type'] = AvayaRecordingClient.Constants.CONTENT_TYPES.PASSWORD_PROTECTED_PROGRAM;
        opts.method = 'POST';
        opts.data = this.convertObjectToServerObject({password: password});
        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/authorize/' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getIndividualProgram(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getAllCategories
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get All Categories
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getAllCategories = function (programParams) {
        arcLogger.debug(this._name + '#getAllCategories: %o', programParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.categoriesUrl + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getCategoryRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getCategory
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get an Individual Category
     * @private
     * @param {string} categoryId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getCategory = function (categoryId, programParams) {
        arcLogger.debug(this._name + '#getCategory: %s, %o', categoryId, programParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.CATEGORY,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.categoriesUrl + '/' + categoryId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getCategoryRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getProgramStatus
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get Status of Program
     * @private
     * @param {string} programId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getProgramStatus = function (programId, programParams) {
        arcLogger.debug(this._name + '#getProgramStatus: %s, %o', programId, programParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.STATUS,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'GET';

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/status' + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getProgramStatusRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getAllTemplates
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get All Program Templates
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getAllTemplates = function (programParams) {
        arcLogger.debug(this._name + '#getAllTemplates: %o', programParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.templatesUrl + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getTemplateRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#getTemplate
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Get an Individual Program Template
     * @private
     * @param {string} templateId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.getTemplate = function (templateId, programParams) {
        arcLogger.debug(this._name + '#getTemplate: %s, %o', templateId, programParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.TEMPLATE,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.templatesUrl + '/' + templateId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.getTemplateRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#updateProgram
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Edit program
     * @private
     * @param {string} programId
     * @param {AvayaRecordingClient.Services.ProgramService.Program} program - object with changes
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.updateProgram = function (programId, program, programParams) {
        arcLogger.debug(this._name + '#updateProgram: %s, %o, %o', programId, program, programParams);

        var opts = {},
        validateResponse = program.validate();

        if (validateResponse.success) {
            delete program._stream;
            delete program._record;
            delete program._distributeToCDN;
            delete program._conferenceAddress;

            opts.headers = {};
            opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM,
                AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS
            ];
            opts.headers['Content-Type'] = [AvayaRecordingClient.Constants.CONTENT_TYPES.PROGRAM];
            opts.data = program;
            opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();
            opts.method = 'PUT';

            return this.updateProgramRequest(opts);
        } else {
            return this._validator.errorInvalidObject(this._name,validateResponse);
        }
    };

    /**
     * @function AvayaRecordingClient.Providers.Program.ProgramClientProvider#deleteProgram
     * @memberOf AvayaRecordingClient.Providers.Program.ProgramClientProvider
     * @desc Delete program
     * @private
     * @param {string} programId
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramParams} programParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ProgramClientProvider.prototype.deleteProgram = function (programId, programParams) {
        arcLogger.debug(this._name + '#deleteProgram: %s, %o', programId, programParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'DELETE';

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + new AvayaRecordingClient.Services.ProgramService.ProgramParams(programParams).buildUrlString();

        return this.deleteProgramRequest(opts);
    };

    AvayaRecordingClient.Providers.Program.ProgramClientProvider = ProgramClientProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Program.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
        this._name = 'AvayaRecordingClient.Providers.Program.Validators.PlainValidator';
    }

    PlainValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    AvayaRecordingClient.Providers.Program.Validators.PlainValidator = PlainValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.Program} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.ProgramValidator
     */
    function ProgramValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    ProgramValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.ProgramValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.ProgramValidator
     * @desc Validate Program object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.Program} program
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    ProgramValidator.prototype.validateObject = function (program) {
        var errors = [];

        if (!this.validate(program.self, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('self');
        }
        if (!this.validate(program.id, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(program.name, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(program.description, AvayaRecordingClient.Constants.CONDITIONS.MULTI_STRING)) {
            errors.push('description');
        }
        if (!this.validate(program.dnAddress, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('dnAddress');
        }
        if (!this.validate(program.tenantId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('tenantId');
        }
        if (!this.validate(program.accessMode, AvayaRecordingClient.Constants.CONDITIONS.ACCESS_MODE)) {
            errors.push('accessMode');
        }
        if (!this.validate(program.thumbnail, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('thumbnail');
        }
        if (!this.validate(program.duration, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('duration');
        }
        if (!this.validate(program.viewCount, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('viewCount');
        }
        if (!this.validate(program.currentViewerCount, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('currentViewerCount');
        }
        if (!this.validate(program.category, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('category');
        }
        if (!this.validate(program.startDate, AvayaRecordingClient.Constants.CONDITIONS.DATE)) {
            errors.push('startDate');
        }
        if (!this.validate(program.creationDate, AvayaRecordingClient.Constants.CONDITIONS.DATE)) {
            errors.push('creationDate');
        }
        if (!this.validate(program.expirationDate, AvayaRecordingClient.Constants.CONDITIONS.DATE)) {
            errors.push('expirationDate');
        }
        if (!this.validate(program.statusUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('statusUrl');
        }
        if (!this.validate(program.passwordProtected, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('passwordProtected');
        }
        if (!this.validate(program.authorizeUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('authorizeUrl');
        }
        if (!this.validate(program.owner, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('owner');
        }
        if (!this.validate(program.size, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('size');
        }
        if (!this.validate(program.mediaType, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('mediaType');
        }
        if (!this.validate(program.allowMediaDownload, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowMediaDownload');
        }
        if (!this.validate(program.available, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('available');
        }
        if (!this.validate(program.canEdit, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('canEdit');
        }
        if (!this.validate(program.chatEnabled, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('chatEnabled');
        }
        if (!this.validate(program.conferenceAddress, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('conferenceAddress');
        }
        if (!this.validate(program.distributeToCDN, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('distributeToCDN');
        }
        if (!this.validate(program.height, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('height');
        }
        if (!this.validate(program.ownerDisplayName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('ownerDisplayName');
        }
        if (!this.validate(program.public, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('public');
        }
        if (!this.validate(program.record, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('record');
        }
        if (!this.validate(program.stream, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('stream');
        }
        if (!this.validate(program.tenantId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('tenantId');
        }
        if (!this.validate(program.width, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('width');
        }
        if (!this.validate(program.accessDenied, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('accessDenied');
        }
        if (!this.validate(program.live, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('live');
        }
        if (!this.validate(program.started, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('started');
        }
        if (!this.validate(program.thumbnailData, AvayaRecordingClient.Constants.CONDITIONS.BASE64)) {
            errors.push('thumbnailData');
        }
        if (!this.validate(program.thumbnailMimeType, AvayaRecordingClient.Constants.CONDITIONS.MIME_IMG)) {
            errors.push('thumbnailMimeType');
        }
        if (!this.validate(program.reportUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('reportUrl');
        }
        if (!this.validate(program.templateId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('templateId');
        }
        if (!this.validate(program.moderatorPin, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('moderatorPin');
        }
        if (!this.validate(program.md5Hash, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('md5Hash');
        }
        if (!this.validate(program.bitrate, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('bitrate');
        }
        if (!this.validate(program.programStatus, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programStatus');
        }
        if (!this.validate(program.deleted, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('deleted');
        }
        if (!this.validate(program.moderatorPinProtected, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('moderatorPinProtected');
        }

        var accessUsers = program.accessUsers;
        if (!Array.isArray(accessUsers)) {
            errors.push('accessUsers: is not an array');
        }

        var participantUsers = program.participantUsers;
        if (!Array.isArray(participantUsers)) {
            errors.push('participantUsers: is not an array');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.ProgramValidator = ProgramValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.Category} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.CategoryValidator
     */
    function CategoryValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    CategoryValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.CategoryValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.CategoryValidator
     * @desc Validate Category object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.Category} category
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    CategoryValidator.prototype.validateObject = function (category) {
        var errors = [];

        if (!this.validate(category.self, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('self');
        }
        if (!this.validate(category.id, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(category.name, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(category.programsUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programsUrl');
        }

        var tenants = category.tenants;
        if (!Array.isArray(tenants)) {
            errors.push('tenants: is not an array');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.CategoryValidator = CategoryValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.Category} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.TemplateValidator
     */
    function TemplateValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    TemplateValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.TemplateValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.TemplateValidator
     * @desc Validate Category object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.Category} template
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    TemplateValidator.prototype.validateObject = function (template) {
        var errors = [];

        if (!this.validate(template.self, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('self');
        }
        if (!this.validate(template.id, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(template.name, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(template.description, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('description');
        }
        if (!this.validate(template.callBitrate, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('callBitrate');
        }
        if (!this.validate(template.callWidth, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('callWidth');
        }
        if (!this.validate(template.callHeight, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('callHeight');
        }

        var tenants = template.tenants;
        if (!Array.isArray(tenants)) {
            errors.push('tenants: is not an array');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.TemplateValidator = TemplateValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.PagedList} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.PagedListValidator
     */
    function PagedListValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    PagedListValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.PagedListValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.PagedListValidator
     * @desc Validate PagedList object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.PagedList} pagedList
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    PagedListValidator.prototype.validateObject = function (pagedList) {
        var errors = [];

        var items = pagedList.items;
        if (!Array.isArray(items)) {
            errors.push('items: is not an array');
        } else {
            for (var i = 0; i < items.length; i++) {
                var res = items[i].validate();
                if (!res.success) {
                    errors.push('items[' + i + ']:' + res.errors);
                }
            }
        }

        if (!this.validate(pagedList.totalItemCount, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('totalItemCount');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.PagedListValidator = PagedListValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.Streams} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.StreamsValidator
     */
    function StreamsValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    StreamsValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.StreamsValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.StreamsValidator
     * @desc Validate Streams object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.Streams} streams
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    StreamsValidator.prototype.validateObject = function (streams) {
        var errors = [];

        if (!this.validate(streams.primaryMediaUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('primaryMediaUrl');
        }
        if (!this.validate(streams.primaryMediaHlsUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('primaryMediaHlsUrl');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.StreamsValidator = StreamsValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.ProgramAddress} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.ProgramAddressValidator
     */
    function ProgramAddressValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    ProgramAddressValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.ProgramAddressValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.ProgramAddressValidator
     * @desc Validate ProgramAddress object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramAddress} programAddress
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    ProgramAddressValidator.prototype.validateObject = function (programAddress) {
        var errors = [];

        if (!this.validate(programAddress.available, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('available');
        }
        if (!this.validate(programAddress.downloadUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('downloadUrl');
        }
        if (!this.validate(programAddress.reportUrl, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('reportUrl');
        }

        var playerPreference = programAddress.playerPreference;
        if (!Array.isArray(playerPreference)) {
            errors.push('playerPreference: is not an array');
        }

        var streamsRes = programAddress.streams.validate();
        if (!streamsRes.success) {
            errors.push(streamsRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.ProgramAddressValidator = ProgramAddressValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.ProgramStatus} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Program.Validators
     * @define AvayaRecordingClient.Providers.Program.Validators.ProgramStatusValidator
     */
    function ProgramStatusValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    ProgramStatusValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.ProgramStatusValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.ProgramStatusValidator
     * @desc Validate ProgramStatus object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.ProgramStatus} programStatus
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    ProgramStatusValidator.prototype.validateObject = function (programStatus) {
        var errors = [];

        if (!this.validate(programStatus.self, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('self');
        }
        if (!this.validate(programStatus.programId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programId');
        }
        if (!this.validate(programStatus.state, AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_STATE)) {
            errors.push('state');
        }
        if (!this.validate(programStatus.stateDetails, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('stateDetails');
        }
        if (!this.validate(programStatus.programCreationStage, AvayaRecordingClient.Constants.CONDITIONS.CREATION_STAGE)) {
            errors.push('programCreationStage');
        }
        if (!this.validate(programStatus.programCreationMessage, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programCreationMessage');
        }
        if (!this.validate(programStatus.recordingState, AvayaRecordingClient.Constants.CONDITIONS.RECORDING_STATE)) {
            errors.push('recordingState');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Program.Validators.ProgramStatusValidator = ProgramStatusValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     *  Chat Service class that contains methods for message send\receive.
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Services
     * @define AvayaRecordingClient.Services.ChatService
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources - object with program resources paths
     */
    function ChatService(resources) {

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaRecordingClient.Providers.ChatClientProvider}
         */
        this._provider = new AvayaRecordingClient.Providers.Chat.ChatClientProvider(resources);
    }

    /**
     * @function AvayaRecordingClient.Services.ChatService#getSessions
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @desc Get all chat sessions in a broadcast. User must be the conference owner or supply the moderator pin.
     * @public
     * @param {string} programId - A unique program id
     * @param {AvayaRecordingClient.Services.ChatService.ChatParams} chatParams - list of parameters for chat API calls
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatService.prototype.getSessions = function (programId, chatParams) {
        return this._provider.getSessions(programId, chatParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ChatService#getSession
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @desc Get a single chat session in a broadcast. User must be either the conference owner, supply the moderator pin or be the owner of the chat session.
     * @public
     * @param {string} programId - A unique program id
     * @param {string} sessionId - A unique id within the program for the session.
     * @param {AvayaRecordingClient.Services.ChatService.ChatParams} chatParams - list of parameters for chat API calls
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatService.prototype.getSession = function (programId, sessionId, chatParams) {
        return this._provider.getSession(programId, sessionId, chatParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ChatService#createSession
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @desc Create a chat session.
     * @public
     * @param {string} programId - A unique program id
     * @param {AvayaRecordingClient.Services.ChatService.ChatParams} chatParams - list of parameters for chat API calls
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatService.prototype.createSession = function (programId, chatParams) {
        return this._provider.createSession(programId, chatParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ChatService#postMessage
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @desc To send a chat message of type ANSWER, the sender must be the logged in moderator/conference owner or send the moderator pin, regardless of whether the target session is for a logged in user or an anonymous user. A session must first be created before posting a chat.
     * @public
     * @param {AvayaRecordingClient.Services.ChatService.ChatMessage} msg - Chat Message object
     * @param {string} programId - A unique program id
     * @param {string} sessionId - A unique id within the program for the session.
     * @param {AvayaRecordingClient.Services.ChatService.ChatParams} chatParams - list of parameters for chat API calls
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatService.prototype.postMessage = function (msg, programId, sessionId, chatParams) {
        return this._provider.postMessage(msg, programId, sessionId, chatParams);
    };

    AvayaRecordingClient.Services.ChatService = ChatService;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Possible params list for chat API calls
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @define AvayaRecordingClient.Services.ChatService.ChatParams
     * @param {Object|undefined} chatParams - object with chat params
     */
    function ChatParams(chatParams) {
        if (chatParams) {
            /**
             * @public
             * @type {string}
             * @desc Moderator pin for the program if the user is not the conference owner
             */
            this.moderatorPin = chatParams.moderatorPin || undefined;
            /**
             * @public
             * @type {string}
             * @desc Only include messages which arrived after this timestamp (milliseconds since epoch GMT).
             */
            this.chatTimestamp = chatParams.chatTimestamp || undefined;
            /**
             * @public
             * @type {string}
             * @desc Display Name for sender
             */
            this.sender = chatParams.sender || undefined;
            /**
             * @public
             * @type {string}
             * @desc Filter programs by tenant. This parameter is implicit in the authentication token. A tenant other than that of the authenticated user may be specified, in which case results will be limited to public recordings within that tenant.
             */
            this.tenantId = chatParams.tenantId || undefined;
            /**
             * @public
             * @type {string}
             * @desc Filter programs by user.
             */
            this.user = chatParams.user || undefined;
        }
    }

    ChatParams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    AvayaRecordingClient.Services.ChatService.ChatParams = ChatParams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Chat Message object
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @define AvayaRecordingClient.Services.ChatService.ChatMessage
     * @param {Object|undefined} chatMessage - object with chat message properties
     */
    function ChatMessage(chatMessage) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof chatMessage !== 'undefined' && chatMessage !== null) {
            this._sessionId = chatMessage.sessionId || '';
            this._message = chatMessage.message || '';
            this._senderDisplayName = chatMessage.senderDisplayName || '';
            // Temporarily
            this._sender = chatMessage.sender || '';
            this._senderId = chatMessage.senderId || '';
            this._timestamp = chatMessage.timestamp || '';
            //this._authenticated = chatMessage.authenticated || false;
            this._callHeight = chatMessage.callHeight || '';
            this._type = chatMessage.type || '';
        } else {
            this._sessionId = '';
            this._message = '';
            this._senderDisplayName = '';
            this._sender = '';
            this._senderId = '';
            this._timestamp = '';
            //this._authenticated = false;
            this._callHeight = '';
            this._type = '';
        }

        this._validator = new AvayaRecordingClient.Providers.Chat.Validators.ChatMessageValidator();
    }

    ChatMessage.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name sessionId
     * @desc A unique id within the program for the session.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'sessionId', {
        get : function () {
            return this._sessionId;
        },
        set : function (val) {
            this._sessionId = val;
        }
    });

    /**
     * @instance
     * @name message
     * @desc The message itself. 1024 chars limit
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'message', {
        get : function () {
            return this._message;
        },
        set : function (val) {
            this._message = val;
        }
    });

    /**
     * @instance
     * @name senderDisplayName
     * @desc Name of the sender asking the question
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'senderDisplayName', {
        get : function () {
            return this._senderDisplayName;
        },
        set : function (val) {
            this._senderDisplayName = val;
        }
    });

    /**
     * @instance
     * @name sender
     * @desc TEMPORARILY FIELD: Name of the sender asking the question
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'sender', {
        get : function () {
            return this._sender;
        },
        set : function (val) {
            this._sender = val;
        }
    });

    /**
     * @instance
     * @name senderId
     * @desc If the sender is a logged in user, the server will fill in this field with the user's unique id (aka 'client user id').
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'senderId', {
        get : function () {
            return this._senderId;
        },
        set : function (val) {
            this._senderId = val;
        }
    });

    /**
     * @instance
     * @name timestamp
     * @desc Timestamp (milliseonds since epoch GMT)
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'timestamp', {
        get : function () {
            return this._timestamp;
        },
        set : function (val) {
            this._timestamp = val;
        }
    });

    /**
     * @instance
     * @name authenticated
     * @desc True if an authenticated user (API requests will have an auth token), False for anonymous users. If True, then sessionId will be the user's unique client id.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'authenticated', {
        get : function () {
            return this._authenticated;
        },
        set : function (val) {
            this._authenticated = val;
        }
    });

    /**
     * @instance
     * @name type
     * @desc Enum (QUESTION | RESPONSE)
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatMessage
     */
    Object.defineProperty(ChatMessage.prototype, 'type', {
        get : function () {
            return this._type;
        },
        set : function (val) {
            this._type = val;
        }
    });

    AvayaRecordingClient.Services.ChatService.ChatMessage = ChatMessage;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Chat Session object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ChatService
     * @define AvayaRecordingClient.Services.ChatService.ChatSession
     * @param {Object|undefined} chatSession - object with chat session properties
     */
    function ChatSession(chatSession) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof chatSession !== 'undefined' && chatSession !== null) {
            this._sessionId = chatSession.sessionId || '';
            this._initiatorName = chatSession.initiatorName || '';
            this._lastMessageTime = chatSession.lastMessageTime || '';
            // Temporarily for capability
            this._lastMessage = chatSession.lastMessage || '';
            this._initiatorAuthenticated = chatSession.initiatorAuthenticated || false;
            this._unansweredCount = chatSession.unansweredCount || '';
            this._messages = [];
            if (chatSession.messages) {
                if (Array.isArray(chatSession.messages)) {
                    for (var i = 0; i < chatSession.messages.length; i++) {
                        this._messages.push(new AvayaRecordingClient.Services.ChatService.ChatMessage(chatSession.messages[i]));
                    }
                } else {
                    this._messages.push(new AvayaRecordingClient.Services.ChatService.ChatMessage(chatSession.messages));
                }
            }
        } else {
            this._sessionId = '';
            this._initiatorName = '';
            this._lastMessageTime = '';
            this._lastMessage = '';
            this._initiatorAuthenticated = false;
            this._unansweredCount = '';
            this._messages = [];
        }

        this._validator = new AvayaRecordingClient.Providers.Chat.Validators.ChatSessionValidator();
    }

    ChatSession.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name sessionId
     * @desc Unique id of the user (if they are logged in) or else a random client generated id.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'sessionId', {
        get : function () {
            return this._sessionId;
        },
        set : function (val) {
            this._sessionId = val;
        }
    });

    /**
     * @instance
     * @name initiatorName
     * @desc Display name of the user who created the chat session.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'initiatorName', {
        get : function () {
            return this._initiatorName;
        },
        set : function (val) {
            this._initiatorName = val;
        }
    });

    /**
     * @instance
     * @name lastMessageTime
     * @desc UTimestamp (milliseconds since epoch GMT) of the last message in the session.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'lastMessageTime', {
        get : function () {
            return this._lastMessageTime;
        },
        set : function (val) {
            this._lastMessageTime = val;
        }
    });

    /**
     * @instance
     * @name lastMessage
     * @desc TEMPORARILY FIELD: UTimestamp (milliseconds since epoch GMT) of the last message in the session.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'lastMessage', {
        get : function () {
            return this._lastMessage;
        },
        set : function (val) {
            this._lastMessage = val;
        }
    });

    /**
     * @instance
     * @name initiatorAuthenticated
     * @desc True if the chat initiator is an authenticated user (API requests will have a valid auth token for the user), False for anonymous users. If True, then sessionId will be the user's unique client id.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'initiatorAuthenticated', {
        get : function () {
            return this._initiatorAuthenticated;
        },
        set : function (val) {
            this._initiatorAuthenticated = val;
        }
    });

    /**
     * @instance
     * @name unansweredCount
     * @desc If most recent chat is from the moderator, this is zero. Otherwise, this is the number of client messages/questions after the most recent moderator message.
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'unansweredCount', {
        get : function () {
            return this._unansweredCount;
        },
        set : function (val) {
            this._unansweredCount = val;
        }
    });

    /**
     * @instance
     * @name messages
     * @desc List of messages in the session
     * @type {Array<AvayaRecordingClient.Services.ChatService.ChatMessage>}
     * @memberOf AvayaRecordingClient.Services.ChatService.ChatSession
     */
    Object.defineProperty(ChatSession.prototype, 'messages', {
        get : function () {
            return this._messages;
        },
        set : function (messages) {
            this._messages = [];
            if (messages) {
                if (Array.isArray(messages)) {
                    for (var i = 0; i < messages.length; i++) {
                        this._messages.push(new AvayaRecordingClient.Services.ChatService.ChatMessage(messages[i]));
                    }
                } else {
                    this._messages.push(new AvayaRecordingClient.Services.ChatService.ChatMessage(messages));
                }
            }
        }
    });

    AvayaRecordingClient.Services.ChatService.ChatSession = ChatSession;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for ASSR(API 2.0) server
     * @private
     * @memberOf AvayaRecordingClient.Providers.Chat
     * @define AvayaRecordingClient.Providers.Chat.ChatServerProvider
     */
    function ChatServerProvider() {
        AvayaRecordingClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaRecordingClient.Providers.Chat.ChatServerProvider';
    }

    ChatServerProvider.prototype = Object.create(AvayaRecordingClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatServerProvider#getSessionRequest
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatServerProvider
     * @desc Get session or sessions
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatServerProvider.prototype.getSessionRequest = function (opts) {
        arcLogger.debug(this._name + '#getSessionRequest: %o', opts);

        var self = this,
        res;

        return this.setCallbacksAndSend(opts, function (response) {
            if (Array.isArray(response)) {
                res = [];

                for (var i = 0; i < response.length; i++) {
                    res.push(new AvayaRecordingClient.Services.ChatService.ChatSession(response[i]));
                }
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', {
                    sessions : res
                });
            } else {
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ChatService.ChatSession(response));
            }
        }, function (response) {
            arcLogger.warn(self._name + '#getSessionRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatServerProvider#createSessionRequest
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatServerProvider
     * @desc Create Session
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatServerProvider.prototype.createSessionRequest = function (opts) {
        arcLogger.debug(this._name + '#createSessionRequest: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.ChatService.ChatSession(response));
        }, function (response) {
            arcLogger.warn(self._name + '#createSessionRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatServerProvider#postMessageRequest
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatServerProvider
     * @desc Create Session
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatServerProvider.prototype.postMessageRequest = function (opts) {
        arcLogger.debug(this._name + '#postMessageRequest: %o', opts);

        var self = this;

        opts.data = this.convertObjectToServerObject(opts.data);

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response);
        }, function (response) {
            arcLogger.warn(self._name + '#postMessageRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatServerProvider#convertObjectToServerObject
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatServerProvider
     * @desc Convert object to server format
     * @private
     * @param {Object} obj - SDK object
     * @returns {Object}
     */
    ChatServerProvider.prototype.convertObjectToServerObject = function (obj) {
        arcLogger.debug(this._name + '#convertObjectToServerObject: %o', obj);
        return JSON.stringify(obj).replace(/"_([0-9a-zA-Z-_]+)"/g, '"$1"').replace(/"validator":\{\},/g, '').replace(/("[^"]+":""[,]*)|[,]*"[^"]+":""/g, '');
    };

    AvayaRecordingClient.Providers.Chat.ChatServerProvider = ChatServerProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Chat.ServerProvider
     * @classdesc SDK API layer. Main implementation class for Recording Chat Service
     * @private
     * @memberOf AvayaRecordingClient.Providers.Chat
     * @define AvayaRecordingClient.Providers.Chat.ChatClientProvider
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources
     */
    function ChatClientProvider(resources) {

        AvayaRecordingClient.Providers.Chat.ChatServerProvider.call(this);

        this._name = 'AvayaRecordingClient.Providers.Chat.ChatClientProvider';

        /**
         * @private
         * @type {string}
         */
        this._resources = resources;

        /**
         * @private
         * @type {AvayaRecordingClient.Providers.Chat.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaRecordingClient.Providers.Chat.Validators.PlainValidator();
    }

    ChatClientProvider.prototype = Object.create(AvayaRecordingClient.Providers.Chat.ChatServerProvider.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatClientProvider#getSessions
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatClientProvider
     * @desc Get all chat sessions in a broadcast. User must be the conference owner or supply the moderator pin.
     * @public
     * @param {string} programId
     * @param {string} chatParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatClientProvider.prototype.getSessions = function (programId, chatParams) {
        arcLogger.debug(this._name + '#getSessions: %o, %o', programId, chatParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/chat/sessions/' + new AvayaRecordingClient.Services.ChatService.ChatParams(chatParams).buildUrlString();

        return this.getSessionRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatClientProvider#getSession
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatClientProvider
     * @desc Get a single chat session in a broadcast. User must be either the conference owner, supply the moderator pin or be the owner of the chat session.
     * @public
     * @param {string} programId
     * @param {string} sessionId
     * @param {string} chatParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatClientProvider.prototype.getSession = function (programId, sessionId, chatParams) {
        arcLogger.debug(this._name + '#getCategory: %s, %s, %o', programId, sessionId, chatParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_SESSION,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/chat/sessions/' + sessionId + new AvayaRecordingClient.Services.ChatService.ChatParams(chatParams).buildUrlString();

        return this.getSessionRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatClientProvider#createSession
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatClientProvider
     * @desc Create a chat session.
     * @public
     * @param {string} programId
     * @param {string} chatParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatClientProvider.prototype.createSession = function (programId, chatParams) {
        arcLogger.debug(this._name + '#createSession: %s, %o', programId, chatParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_SESSION;
        opts.method = 'POST';

        opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/chat/sessions/' + new AvayaRecordingClient.Services.ChatService.ChatParams(chatParams).buildUrlString();

        return this.createSessionRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Chat.ChatClientProvider#postMessage
     * @memberOf AvayaRecordingClient.Providers.Chat.ChatClientProvider
     * @desc To send a chat message of type ANSWER, the sender must be the logged in moderator/conference owner or send the moderator pin, regardless of whether the target session is for a logged in user or an anonymous user. A session must first be created before posting a chat.
     * @public
     * @param {AvayaRecordingClient.Services.ChatService.ChatMessage} msg
     * @param {string} programId
     * @param {string} sessionId
     * @param {string} chatParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ChatClientProvider.prototype.postMessage = function (msg, programId, sessionId, chatParams) {
        arcLogger.debug(this._name + '#postMessage: %s, %o', programId, chatParams);

        var validateResponse = msg.validate();

        if (validateResponse.success) {
            var opts = {};
            opts.headers = {};
            opts.headers['Content-Type'] = AvayaRecordingClient.Constants.CONTENT_TYPES.CHAT_MESSAGE;
            opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
            opts.method = 'POST';
            opts.data = msg;

            opts.url = this._resources.baseUrl + this._resources.programResources.programsUrl + '/' + programId + '/chat/sessions/' + sessionId + new AvayaRecordingClient.Services.ChatService.ChatParams(chatParams).buildUrlString();

            return this.postMessageRequest(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#postMessage', validateResponse);
        }
    };

    AvayaRecordingClient.Providers.Chat.ChatClientProvider = ChatClientProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ChatService.ChatMessage} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Chat.Validators
     * @define AvayaRecordingClient.Providers.Chat.Validators.ChatMessageValidator
     */
    function ChatMessageValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    ChatMessageValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Chat.Validators.ChatMessageValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Chat.Validators.ChatMessageValidator
     * @desc Validate Category object
     * @private
     * @param {AvayaRecordingClient.Services.ChatService.ChatMessage} chatMessage
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    ChatMessageValidator.prototype.validateObject = function (chatMessage) {
        var errors = [];

        if (!this.validate(chatMessage.sessionId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('sessionId');
        }
        if (!this.validate(chatMessage.message, AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE)) {
            errors.push('message');
        }
        if (!this.validate(chatMessage.senderDisplayName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('senderDisplayName');
        }
        if (!this.validate(chatMessage.sender, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('sender');
        }
        if (!this.validate(chatMessage.senderId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('senderId');
        }
        if (!this.validate(chatMessage.timestamp, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('timestamp');
        }
        if (!this.validate(chatMessage.authenticated, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('authenticated');
        }
        if (!this.validate(chatMessage.type, AvayaRecordingClient.Constants.CONDITIONS.CHAT_MESSAGE_TYPE)) {
            errors.push('type');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Chat.Validators.ChatMessageValidator = ChatMessageValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ProgramService.Category} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Chat.Validators
     * @define AvayaRecordingClient.Providers.Chat.Validators.ChatSessionValidator
     */
    function ChatSessionValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    ChatSessionValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.ChatSessionValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.ChatSessionValidator
     * @desc Validate Category object
     * @private
     * @param {AvayaRecordingClient.Services.ProgramService.Category} chatSession
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    ChatSessionValidator.prototype.validateObject = function (chatSession) {
        var errors = [];

        if (!this.validate(chatSession.sessionId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('sessionId');
        }
        if (!this.validate(chatSession.initiatorName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('initiatorName');
        }
        if (!this.validate(chatSession.lastMessageTime, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('lastMessageTime');
        }
        if (!this.validate(chatSession.lastMessage, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('lastMessage');
        }
        if (!this.validate(chatSession.isInitiatorAuthenticated, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('isInitiatorAuthenticated');
        }
        if (!this.validate(chatSession.unansweredCount, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('unansweredCount');
        }

        var messages = chatSession.messages;
        if (!Array.isArray(messages)) {
            errors.push('messages: is not an array');
        } else {
            for (var i = 0; i < messages.length; i++) {
                var res = messages[i].validate();
                if (!res.success) {
                    errors.push('messages[' + i + ']:' + res.errors);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Chat.Validators.ChatSessionValidator = ChatSessionValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Chat.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaRecordingClient.Providers.Chat.Validators
     * @define AvayaRecordingClient.Providers.Chat.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
        this._name = 'AvayaRecordingClient.Providers.Chat.Validators.PlainValidator';
    }

    PlainValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    AvayaRecordingClient.Providers.Chat.Validators.PlainValidator = PlainValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * System Settings Service class that contains methods for get/edit system settings
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Services
     * @define AvayaRecordingClient.Services.SystemSettingsService
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources - object with program resources paths
     */
    function SystemSettingsService(resources) {

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaRecordingClient.Providers.SystemSettings}
         */
        this._provider = new AvayaRecordingClient.Providers.SystemSettings.SystemSettingsClientProvider(resources);
    }

    /**
     * @function AvayaRecordingClient.Services.SystemSettingsService#getSystemSettings
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService
     * @desc get system params
     * @public
     * @param {AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams} systemSettingsParams - params for getting system settings.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    SystemSettingsService.prototype.getSystemSettings = function(systemSettingsParams) {
        return this._provider.getSystemSettings(systemSettingsParams);
    };

    AvayaRecordingClient.Services.SystemSettingsService = SystemSettingsService;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * General SystemSettings object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService
     * @define AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     * @param {Object|undefined} systemSettings - object with system settings properties
     */
    function SystemSettings(systemSettings) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof systemSettings !== 'undefined' && systemSettings !== null) {
            this._multiTenant = (typeof(systemSettings.multiTenant) === 'boolean') ? systemSettings.multiTenant : false;
            this._allowGuestAccess = (typeof(systemSettings.allowGuestAccess) === 'boolean') ? systemSettings.allowGuestAccess : true;
            this._ipAddress = systemSettings.ipAddress || '';
            this._macAddress = systemSettings.macAddress || '';
            this._uptime = systemSettings.uptime || 0;
            this._encryptionSupport = (typeof(systemSettings.encryptionSupport) === 'boolean') ? systemSettings.encryptionSupport : false;
            this._systemTime = systemSettings.systemTime || 0;
            this._systemTimeISO8601 = systemSettings.systemTimeISO8601 || '';
            this._recordingRetentionPolicy = systemSettings.recordingRetentionPolicy || '';
            this._daysToRetainDeletedRecordings = systemSettings.daysToRetainDeletedRecordings || 0;
        } else {
            this._multiTenant = false;
            this._allowGuestAccess = true;
            this._ipAddress = '';
            this._macAddress = '';
            this._uptime = 0;
            this._encryptionSupport = false;
            this._systemTime = 0;
            this._systemTimeISO8601 = '';
            this._recordingRetentionPolicy = '';
            this._daysToRetainDeletedRecordings = 0;
        }

        this._validator = new AvayaRecordingClient.Providers.SystemSettings.Validators.SystemSettingsValidator();
    }

    SystemSettings.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name multiTenant
     * @desc If true, the system is configured for multiple tenants. If false, the system is configured for a single tenant.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'multiTenant', {
        get : function () {
            return this._multiTenant;
        },
        set : function (val) {
            this._multiTenant = val;
        }
    });

    /**
     * @instance
     * @name allowGuestAccess
     * @desc if true (default), unauthenticated users are allowed to browse and play public content.
     *       This setting is only returned if the product is in Enterprise Mode.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'allowGuestAccess', {
        get : function () {
            return this._allowGuestAccess;
        },
        set : function (val) {
            this._allowGuestAccess = val;
        }
    });

    /**
     * @instance
     * @name ipAddress
     * @desc IP address of the ASSR Manager
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'ipAddress', {
        get : function () {
            return this._ipAddress;
        },
        set : function (val) {
            this._ipAddress = val;
        }
    });

    /**
     * @instance
     * @name macAddress
     * @desc MAC Address of the ASSR Manager
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'macAddress', {
        get : function () {
            return this._macAddress;
        },
        set : function (val) {
            this._macAddress = val;
        }
    });

    /**
     * @instance
     * @name uptime
     * @desc Server (JVM) uptime in milliseconds
     * @type {integer}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'uptime', {
        get : function () {
            return this._uptime;
        },
        set : function (val) {
            this._uptime = val;
        }
    });

    /**
     * @instance
     * @name encryptionSupport
     * @desc True if Manager license key supports encryption
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'encryptionSupport', {
        get : function () {
            return this._encryptionSupport;
        },
        set : function (val) {
            this._encryptionSupport = val;
        }
    });

    /**
     * @instance
     * @name systemTime
     * @desc Current system time on the server in milliseconds since epoch (1 Jan 1970, GMT)
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'systemTime', {
        get : function () {
            return this._systemTime;
        },
        set : function (val) {
            this._systemTime = val;
        }
    });

    /**
     * @instance
     * @name systemTimeISO8601
     * @desc Current system time in ISO 8601 format
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'systemTimeISO8601', {
        get : function () {
            return this._systemTimeISO8601;
        },
        set : function (val) {
            this._systemTimeISO8601 = val;
        }
    });

    /**
     * @instance
     * @name recordingRetentionPolicy
     * @desc One of the following values:
     *       FOREVER: delete recordings retained until manually deleted by the administrator
     *                or explicitly permanently deleted by an API call.
     *       N_DAYS: deleted recordings retained for a specific number of days
     *       DO_NOT_RETAIN: recordings deleted immediately on user action
     *
     *       This setting is only returned if the product is in Enterprise Mode.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'recordingRetentionPolicy', {
        get : function () {
            return this._recordingRetentionPolicy;
        },
        set : function (val) {
            this._recordingRetentionPolicy = val;
        }
    });

    /**
     * @instance
     * @name daysToRetainDeletedRecordings
     * @desc If recording retention policy is 'N_DAYS' then this value will be set and contain
     *       the number of days recordings are retained.
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService.SystemSettings
     */
    Object.defineProperty(SystemSettings.prototype, 'daysToRetainDeletedRecordings', {
        get : function () {
            return this._daysToRetainDeletedRecordings;
        },
        set : function (val) {
            this._daysToRetainDeletedRecordings = val;
        }
    });

    AvayaRecordingClient.Services.SystemSettingsService.SystemSettings = SystemSettings;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Possible params list for system settings API calls
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.SystemSettingsService
     * @define AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams
     * @param {Object|undefined} systemSettingsParams - object with system settings parameters
     */
    function SystemSettingsParams(systemSettingsParams) {
        if (systemSettingsParams) {
            /**
             * @public
             * @type {string}
             * @desc Filter programs by tenant. This parameter is implicit in the authentication token. A tenant other than that of the authenticated user may be specified, in which case results will be limited to public recordings within that tenant.
             */
            this.tenantId = systemSettingsParams.tenantId || '';
            /**
             * @public
             * @type {string}
             * @desc Filter programs by user.
             */
            this.user = systemSettingsParams.user || '';
        }
    }

    SystemSettingsParams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams = SystemSettingsParams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for ASSR(API 2.0) server
     * @private
     * @memberOf AvayaRecordingClient.Providers.SystemSettings
     * @define AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider
     */
    function SystemSettingsServerProvider() {
        AvayaRecordingClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider';
    }

    SystemSettingsServerProvider.prototype = Object.create(AvayaRecordingClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider#getSystemSettingsByOptions
     * @memberOf AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider
     * @desc stub method
     * @private
     * @param {Object} opts - jQuery ajax options object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    SystemSettingsServerProvider.prototype.getSystemSettingsByOptions = function (opts) {
        arcLogger.debug(this._name + '#getSystemSettingsByOptions: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.SystemSettingsService.SystemSettings(response));
        }, function (response) {
            arcLogger.warn(self._name + '#getSystemSettingsByOptions::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider#convertObjectToServerObject
     * @memberOf AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider
     * @desc Convert object to server format
     * @private
     * @param {Object} obj - SDK object
     * @returns {Object}
     */
    SystemSettingsServerProvider.prototype.convertObjectToServerObject = function (obj) {
        return JSON.stringify(obj).replace(/_(\w+)/g, '$1').replace(/"(\w+)"/g, function (x, y) {
            return '"' + y.charAt(0).toUpperCase() + y.slice(1) + '"';
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider#convertObjectToSdkObject
     * @memberOf AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} obj - JSON object from server
     * @returns {Object}
     */
    SystemSettingsServerProvider.prototype.convertObjectToSdkObject = function (obj) {
        var sdkObj = new AvayaRecordingClient.Services.SystemSettingsService.SystemSettings(JSON.parse(obj));

        return sdkObj;
    };

    AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider = SystemSettingsServerProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.SystemSettings.ServerProvider
     * @classdesc SDK API layer. Main implementation class for Recording System Settings Service
     * @private
     * @memberOf AvayaRecordingClient.Providers.SystemSettings
     * @define AvayaRecordingClient.Providers.SystemSettings.SystemSettingsClientProvider
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources
     */
    function SystemSettingsClientProvider(resources) {

        AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider.call(this);

        this._name = 'AvayaRecordingClient.Providers.SystemSettings.SystemSettingsClientProvider';

        /**
         * @private
         * @type {string}
         */
        this._resources = resources;

        /**
         * @private
         * @type {AvayaRecordingClient.Providers.SystemSettings.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaRecordingClient.Providers.SystemSettings.Validators.PlainValidator();
    }

    SystemSettingsClientProvider.prototype = Object.create(AvayaRecordingClient.Providers.SystemSettings.SystemSettingsServerProvider.prototype);

    /**
     * @function AvayaRecordingClient.SystemSettingsClientProvider#getSystemSettings
     * @memberOf AvayaRecordingClient.SystemSettingsClientProvider
     * @desc Get system settings of product
     * @private
     * @param {AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams} systemSettingsParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    SystemSettingsClientProvider.prototype.getSystemSettings = function (systemSettingsParams) {
        var opts = {};
        opts.url = this._resources.baseUrl + '/api/manager/system/settings' + new AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams(systemSettingsParams).buildUrlString();
        return this.getSystemSettingsByOptions(opts);
    };

    AvayaRecordingClient.Providers.SystemSettings.SystemSettingsClientProvider = SystemSettingsClientProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.SystemSettings.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaRecordingClient.Providers.SystemSettings.Validators
     * @define AvayaRecordingClient.Providers.SystemSettings.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
        this._name = 'AvayaRecordingClient.Providers.SystemSettings.Validators.PlainValidator';
    }

    PlainValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    AvayaRecordingClient.Providers.SystemSettings.Validators.PlainValidator = PlainValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.SystemSettingsService.SystemSettings} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.SystemSettings.Validators
     * @define AvayaRecordingClient.Providers.SystemSettings.Validators.SystemSettingsValidator
     */
    function SystemSettingsValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    SystemSettingsValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.SystemSettings.Validators.SystemSettingsValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.SystemSettings.Validators.SystemSettingsValidator
     * @desc Validate SystemSettings object
     * @private
     * @param {AvayaRecordingClient.Services.SystemSettingsService.SystemSettings} systemSettings
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    SystemSettingsValidator.prototype.validateObject = function (systemSettings) {
        var errors = [];

        if (!this.validate(systemSettings.multiTenant, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('multiTenant');
        }
        if (!this.validate(systemSettings.allowGuestAccess, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowGuestAccess');
        }
        if (!this.validate(systemSettings.ipAddress, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('ipAddress');
        }
        if (!this.validate(systemSettings.macAddress, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('macAddress');
        }
        if (!this.validate(systemSettings.uptime, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('uptime');
        }
        if (!this.validate(systemSettings.encryptionSupport, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('encryptionSupport');
        }
        if (!this.validate(systemSettings.systemTime, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('systemTime');
        }
        if (!this.validate(systemSettings.systemTimeISO8601, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('systemTimeISO8601');
        }
        if (!this.validate(systemSettings.recordingRetentionPolicy, AvayaRecordingClient.Constants.CONDITIONS.RETENTION_POLICY)) {
            errors.push('recordingRetentionPolicy');
        }
        if (!this.validate(systemSettings.daysToRetainDeletedRecordings, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('daysToRetainDeletedRecordings');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.SystemSettings.Validators.SystemSettingsValidator = SystemSettingsValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Tenant Service class that contains methods for manage tenants
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Services
     * @define AvayaRecordingClient.Services.TenantService
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources - object with program resources paths
     */
    function TenantService(resources) {

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaRecordingClient.Providers.Tenant}
         */
        this._provider = new AvayaRecordingClient.Providers.Tenant.TenantClientProvider(resources);
    }

    /**
     * @function AvayaRecordingClient.Services.TenantService#getIndividualTenant
     * @memberOf AvayaRecordingClient.Services.TenantService
     * @desc get an individual tenant params
     * @public
     * @param {string} tenantId - Id of the tenant
     * @param {AvayaRecordingClient.Services.TenantService.TenantParams} tenantParams - params for getting tenant settings.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    TenantService.prototype.getIndividualTenant = function(tenantId, tenantParams) {
        return this._provider.getIndividualTenant(tenantId, tenantParams);
    };

    AvayaRecordingClient.Services.TenantService = TenantService;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * General Tenant object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.TenantService
     * @define AvayaRecordingClient.Services.TenantService.Tenant
     * @param {Object|undefined} tenant - object with tenant properties
     */
    function Tenant(tenant) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof tenant !== 'undefined' && tenant !== null) {
            this._id = tenant.id || '';
            this._name = tenant.name || '';
            this._enabled = (typeof(tenant.enabled) === 'boolean') ? tenant.enabled : true;
            this._allowGuestAccess = (typeof(tenant.allowGuestAccess) === 'boolean') ? tenant.allowGuestAccess : true;
            this._recordingRetentionPolicy = tenant.recordingRetentionPolicy || '';
            this._daysToRetainDeletedRecordings = tenant.daysToRetainDeletedRecordings || 0;
        } else {
            this._id = '';
            this._name = '';
            this._enabled = true;
            this._allowGuestAccess = true;
            this._recordingRetentionPolicy = '';
            this._daysToRetainDeletedRecordings = 0;
        }

        this._validator = new AvayaRecordingClient.Providers.Tenant.Validators.TenantValidator();
    }

    Tenant.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc Id of tenant. If id is not provided when creating a tenant, an id will be generated.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.TenantService.Tenant
     */
    Object.defineProperty(Tenant.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc Display name of Tenant
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.TenantService.Tenant
     */
    Object.defineProperty(Tenant.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    /**
     * @instance
     * @name enabled
     * @desc If true, the tenant is enabled.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.TenantService.Tenant
     */
    Object.defineProperty(Tenant.prototype, 'enabled', {
        get : function () {
            return this._enabled;
        },
        set : function (val) {
            this._enabled = val;
        }
    });

   /**
     * @instance
     * @name allowGuestAccess
     * @desc if true (default), unauthenticated users are allowed to browse and play public content.
     *       This setting is only returned if the product is in Enterprise Mode.
     * @type {boolean}
     * @memberOf AvayaRecordingClient.Services.TenantService.Tenant
     */
    Object.defineProperty(Tenant.prototype, 'allowGuestAccess', {
        get : function () {
            return this._allowGuestAccess;
        },
        set : function (val) {
            this._allowGuestAccess = val;
        }
    });

    /**
     * @instance
     * @name recordingRetentionPolicy
     * @desc One of the following values:
     *       FOREVER: delete recordings retained until manually deleted by the administrator
     *                or explicitly permanently deleted by an API call.
     *       N_DAYS: deleted recordings retained for a specific number of days
     *       DO_NOT_RETAIN: recordings deleted immediately on user action
     *
     *       This setting is only returned if the product is in Enterprise Mode.
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.TenantService.Tenant
     */
    Object.defineProperty(Tenant.prototype, 'recordingRetentionPolicy', {
        get : function () {
            return this._recordingRetentionPolicy;
        },
        set : function (val) {
            this._recordingRetentionPolicy = val;
        }
    });

    /**
     * @instance
     * @name daysToRetainDeletedRecordings
     * @desc If recording retention policy is 'N_DAYS' then this value will be set and contain
     *       the number of days recordings are retained.
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.TenantService.Tenant
     */
    Object.defineProperty(Tenant.prototype, 'daysToRetainDeletedRecordings', {
        get : function () {
            return this._daysToRetainDeletedRecordings;
        },
        set : function (val) {
            this._daysToRetainDeletedRecordings = val;
        }
    });


    AvayaRecordingClient.Services.TenantService.Tenant = Tenant;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Possible params list for tenant API calls
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.TenantService
     * @define AvayaRecordingClient.Services.TenantService.TenantParams
     * @param {Object|undefined} TenantParams - object with tenant settings parameters
     */
    function TenantParams(tenantParams) {
        if (tenantParams) {
            /**
             * @public
             * @type {string}
             * @desc Filter programs by tenant. This parameter is implicit in the authentication token. A tenant other than that of the authenticated user may be specified, in which case results will be limited to public recordings within that tenant.
             */
            this.tenantId = tenantParams.tenantId || undefined;
            /**
             * @public
             * @type {string}
             * @desc Filter programs by user.
             */
            this.user = tenantParams.user || undefined;
        }
    }

    TenantParams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    AvayaRecordingClient.Services.TenantService.TenantParams = TenantParams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for ASSR(API 2.0) server
     * @private
     * @memberOf AvayaRecordingClient.Providers.Tenant
     * @define AvayaRecordingClient.Providers.Tenant.TenantServerProvider
     */
    function TenantServerProvider() {
        AvayaRecordingClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaRecordingClient.Providers.Tenant.TenantServerProvider';
    }

    TenantServerProvider.prototype = Object.create(AvayaRecordingClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Tenant.TenantServerProvider#getIndividualTenantByOptions
     * @memberOf AvayaRecordingClient.Providers.Tenant.TenantServerProvider
     * @desc stub method
     * @private
     * @param {Object} opts - jQuery ajax options object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    TenantServerProvider.prototype.getIndividualTenantByOptions = function (opts) {
        arcLogger.debug(this._name + '#getIndividualTenantByOptions: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', new AvayaRecordingClient.Services.TenantService.Tenant(response));
        }, function (response) {
            arcLogger.warn(self._name + '#getTenant::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Tenant.TenantServerProvider#convertObjectToServerObject
     * @memberOf AvayaRecordingClient.Providers.Tenant.TenantServerProvider
     * @desc Convert object to server format
     * @private
     * @param {Object} obj - SDK object
     * @returns {Object}
     */
    TenantServerProvider.prototype.convertObjectToServerObject = function (obj) {
        return JSON.stringify(obj).replace(/_(\w+)/g, '$1').replace(/"(\w+)"/g, function (x, y) {
            return '"' + y.charAt(0).toUpperCase() + y.slice(1) + '"';
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Tenant.TenantServerProvider#convertObjectToSdkObject
     * @memberOf AvayaRecordingClient.Providers.Tenant.TenantServerProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} obj - JSON object from server
     * @returns {Object}
     */
    TenantServerProvider.prototype.convertObjectToSdkObject = function (obj) {
        var sdkObj = new AvayaRecordingClient.Services.TenantService.Tenant(JSON.parse(obj));

        return sdkObj;
    };

    AvayaRecordingClient.Providers.Tenant.TenantServerProvider = TenantServerProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Tenant.ServerProvider
     * @classdesc SDK API layer. Implementation class for Tenant Service
     * @private
     * @memberOf AvayaRecordingClient.Providers.Tenant
     * @define AvayaRecordingClient.Providers.Tenant.TenantClientProvider
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources
     */
    function TenantClientProvider(resources) {

        AvayaRecordingClient.Providers.Tenant.TenantServerProvider.call(this);

        this._name = 'AvayaRecordingClient.Providers.Tenant.TenantClientProvider';

        /**
         * @private
         * @type {string}
         */
        this._resources = resources;

        /**
         * @private
         * @type {AvayaRecordingClient.Providers.Tenant.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaRecordingClient.Providers.Tenant.Validators.PlainValidator();
    }

    TenantClientProvider.prototype = Object.create(AvayaRecordingClient.Providers.Tenant.TenantServerProvider.prototype);

    /**
     * @function AvayaRecordingClient.TenantClientProvider#getIndividualTenant
     * @memberOf AvayaRecordingClient.TenantClientProvider
     * @desc Get tenant parameters
     * @private
     * @param {string} tenantId
     * @param {AvayaRecordingClient.Services.TenantService.TenantParams} tenantParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    TenantClientProvider.prototype.getIndividualTenant = function (tenantId, tenantParams) {
        var opts = {};
        opts.url = this._resources.baseUrl + '/api/manager/tenants/' + tenantId + new AvayaRecordingClient.Services.TenantService.TenantParams(tenantParams).buildUrlString();
        return this.getIndividualTenantByOptions(opts);
    };

    AvayaRecordingClient.Providers.Tenant.TenantClientProvider = TenantClientProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Tenant.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaRecordingClient.Providers.Tenant.Validators
     * @define AvayaRecordingClient.Providers.Tenant.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
        this._name = 'AvayaRecordingClient.Providers.Tenant.Validators.PlainValidator';
    }

    PlainValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    AvayaRecordingClient.Providers.Tenant.Validators.PlainValidator = PlainValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.TenantService.Tenant} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Tenant.Validators
     * @define AvayaRecordingClient.Providers.Tenant.Validators.TenantValidator
     */
    function TenantValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    TenantValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Program.Validators.TenantValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Program.Validators.TenantValidator
     * @desc Validate Tenant object
     * @private
     * @param {AvayaRecordingClient.Services.TenantService.Tenant} tenant
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    TenantValidator.prototype.validateObject = function (tenant) {
        var errors = [];

        if (!this.validate(tenant.id, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(tenant.name, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(tenant.enabled, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('enabled');
        }
        if (!this.validate(tenant.allowGuestAccess, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowGuestAccess');
        }
        if (!this.validate(tenant.recordingRetentionPolicy, AvayaRecordingClient.Constants.CONDITIONS.RETENTION_POLICY)) {
            errors.push('recordingRetentionPolicy');
        }
        if (!this.validate(tenant.daysToRetainDeletedRecordings, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('daysToRetainDeletedRecordings');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Tenant.Validators.TenantValidator = TenantValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Viewing reports service class that contains methods for getting reports.
     *
     * @class
     * @constructor
     * @public
     * @memberOf AvayaRecordingClient.Services
     * @define AvayaRecordingClient.Services.ReportsService
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources - object with program resources paths
     */
    function ReportsService(resources) {
        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaRecordingClient.Providers.Reports.ReportsClientProvider}
         */
        this._provider = new AvayaRecordingClient.Providers.Reports.ReportsClientProvider(resources);
    }

    /**
     * @function AvayaRecordingClient.Services.ReportsService#getProgramAccessReport
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @desc Retrieve program access reports
     * @public
     * @param {AvayaRecordingClient.Services.ReportsService.AccessReportParams} reportParams - params for getting access report.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsService.prototype.getProgramAccessReport = function (reportParams) {
        return this._provider.getProgramAccessReport(reportParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ReportsService#getProgramAccessReportForProgram
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @desc Retrieve program access reports for a single program
     * @public
     * @param {string} programId - Id of the program
     * @param {AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams} reportParams - params for getting access report.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsService.prototype.getProgramAccessReportForProgram = function (programId, reportParams) {
        return this._provider.getProgramAccessReportForProgram(programId, reportParams);
    };

    /**
     * @function AvayaRecordingClient.Services.ReportsService#getProgramViewers
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @desc Retrieve program viewer information for a single program
     * @public
     * @param {string} programId - Id of the program
     * @param {AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams} reportParams - params for getting program viewer information.
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsService.prototype.getProgramViewers = function (programId, reportParams) {
        return this._provider.getProgramViewers(programId, reportParams);
    };

    AvayaRecordingClient.Services.ReportsService = ReportsService;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * AccessReport object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @define AvayaRecordingClient.Services.ReportsService.AccessReport
     * @param {Object|undefined} report - object with access report properties
     */
    function AccessReport(report) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof report !== 'undefined' && report !== null) {
            this._programId = report.programId || '';
            this._programName = report.programName || '';
            this._ownerName = report.ownerName || '';
            this._categoryName = report.categoryName || '';
            this._accessReportName = report.accessReportName || '';
            this._programType = report.programType || '';
            this._username = report.username || '';
            this._guest = report.guest || undefined;
            this._clientIpAddr = report.clientIpAddr || '';
            this._userAgent = report.userAgent || '';
            this._startDate = report.startDate || undefined;
            this._duration = report.duration || 0;
            this._dnName = report.dnName || '';
            this._dnAddress = report.dnAddress || '';
            this._location = report.location || '';
        } else {
            this._programId = '';
            this._programName = '';
            this._ownerName = '';
            this._categoryName = '';
            this._accessReportName = '';
            this._programType = '';
            this._username = '';
            this._guest = undefined;
            this._clientIpAddr = '';
            this._userAgent = '';
            this._startDate = undefined;
            this._duration = 0;
            this._dnName = '';
            this._dnAddress = '';
            this._location = '';        }

        this._validator = new AvayaRecordingClient.Providers.Reports.Validators.AccessReportValidator();
    }

    AccessReport.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc The unique ID of the program
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'programId', {
        get: function () {
            return this._programId;
        },
        set: function (val) {
            this._programId = val;
        }
    });

    /**
     * @instance
     * @name programName
     * @desc The name of the program
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'programName', {
        get: function () {
            return this._programName;
        },
        set: function (val) {
            this._programName = val;
        }
    });

    /**
     * @instance
     * @name ownerName
     * @desc The name of the owner of the program
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'ownerName', {
        get: function () {
            return this._ownerName;
        },
        set: function (val) {
            this._ownerName = val;
        }
    });

    /**
     * @instance
     * @name categoryName
     * @desc The name of the category that the program belongs to, if any
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'categoryName', {
        get: function () {
            return this._categoryName;
        },
        set: function (val) {
            this._categoryName = val;
        }
    });

    /**
     * @instance
     * @name accessReportName
     * @desc The name of the AccessReport that the program is associated with (only shown to administrators)
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'accessReportName', {
        get: function () {
            return this._accessReportName;
        },
        set: function (val) {
            this._accessReportName = val;
        }
    });

    /**
     * @instance
     * @name programType
     * @desc  The type of program. One of the following values:
     *        LIVE - the program represents a live broadcast.
     *        VOD  - the program represents a recording/VOD.
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'programType', {
        get: function () {
            return this._programType;
        },
        set: function (val) {
            this._programType = val;
        }
    });

    /**
     * @instance
     * @name username
     * @desc The name of the viewer (null for guests)
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'username', {
        get: function () {
            return this._username;
        },
        set: function (val) {
            this._username = val;
        }
    });

    /**
     * @instance
     * @name username
     * @desc True if the viewer was a guest (null for non-guests)
     * @type {Boolean}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'guest', {
        get: function () {
            return this._guest;
        },
        set: function (val) {
            this._guest = val;
        }
    });

    /**
     * @instance
     * @name clientIpAddr
     * @desc The IP address of the viewer
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'clientIpAddr', {
        get: function () {
            return this._clientIpAddr;
        },
        set: function (val) {
            this._clientIpAddr = val;
        }
    });

    /**
     * @instance
     * @name userAgent
     * @desc The user agent given by the viewer
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'userAgent', {
        get: function () {
            return this._userAgent;
        },
        set: function (val) {
            this._userAgent = val;
        }
    });

    /**
     * @instance
     * @name startDate
     * @desc The date and time when the viewer started viewing
     * @type {Date}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'startDate', {
        get: function () {
            return this._startDate;
        },
        set: function (val) {
            this._startDate = val;
        }
    });

    /**
     * @instance
     * @name duration
     * @desc The duration for which the program was viewed by this viewer
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'duration', {
        get: function () {
            return this._duration;
        },
        set: function (val) {
            this._duration = val;
        }
    });

    /**
     * @instance
     * @name dnName
     * @desc The name of the DN that the viewer played the program from
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'dnName', {
        get: function () {
            return this._dnName;
        },
        set: function (val) {
            this._dnName = val;
        }
    });

    /**
     * @instance
     * @name dnAddress
     * @desc The address of the DN that the viewer played the program from
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'dnAddress', {
        get: function () {
            return this._dnAddress;
        },
        set: function (val) {
            this._dnAddress = val;
        }
    });

    /**
     * @instance
     * @name location
     * @desc The location of the viewer.  This is either the name of the viewer group associated with
     *       the DN that the program was played on, or the name of the DN itself if it was not in a viewer group.
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.AccessReport
     */
    Object.defineProperty(AccessReport.prototype, 'location', {
        get: function () {
            return this._location;
        },
        set: function (val) {
            this._location = val;
        }
    });

    AvayaRecordingClient.Services.ReportsService.AccessReport = AccessReport;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * ViewerReport object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @define AvayaRecordingClient.Services.ReportsService.ViewerReport
     * @param {Object|undefined} report - object with viewer report properties
     */
    function ViewerReport(report) {

        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof report !== 'undefined' && report !== null) {
            this._programId = report.programId || '';
            this._programName = report.programName || '';
            this._ownerName = report.ownerName || '';
            this._categoryName = report.categoryName || '';
            this._tenantName = report.tenantName || '';
            this._programType = report.programType || '';
            this._registeredUserViews = report.registeredUserViews || 0;
            this._guestUserViews = report.guestUserViews || 0;
            this._totalViews = report.totalViews || 0;
            this._views = report.views || [];
           
        } else {
            this._programId = '';
            this._programName = '';
            this._ownerName = '';
            this._categoryName = '';
            this._tenantName = '';
            this._programType = '';
            this._registeredUserViews =  0;
            this._guestUserViews =0;
            this._totalViews = 0;
            this._views = [];

        }

        this._validator = new AvayaRecordingClient.Providers.Reports.Validators.AccessReportOneProgramValidator();
    }

    ViewerReport.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc The unique ID of the program
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'programId', {
        get: function () {
            return this._programId;
        },
        set: function (val) {
            this._programId = val;
        }
    });

    /**
     * @instance
     * @name programName
     * @desc The name of the program
     * @type {string}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'programName', {
        get: function () {
            return this._programName;
        },
        set: function (val) {
            this._programName = val;
        }
    });

    /**
     * @instance
     * @name ownerName
     * @desc The name of the owner of the program
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'ownerName', {
        get: function () {
            return this._ownerName;
        },
        set: function (val) {
            this._ownerName = val;
        }
    });

    /**
     * @instance
     * @name categoryName
     * @desc The name of the category that the program belongs to, if any
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'categoryName', {
        get: function () {
            return this._categoryName;
        },
        set: function (val) {
            this._categoryName = val;
        }
    });

    /**
     * @instance
     * @name tenantName
     * @desc The name of the tenant that the program is associated with (only shown to administrators)
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'tenantName', {
        get: function () {
            return this._tenantName;
        },
        set: function (val) {
            this._tenantName = val;
        }
    });

    /**
     * @instance
     * @name programType
     * @desc  The type of program. One of the following values:
     *        LIVE - the program represents a live broadcast.
     *        VOD  - the program represents a recording/VOD.
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'programType', {
        get: function () {
            return this._programType;
        },
        set: function (val) {
            this._programType = val;
        }
    });

    /**
     * @instance
     * @name registeredUserViews
     * @desc The total number of views by registered users
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'registeredUserViews', {
        get: function () {
            return this._registeredUserViews;
        },
        set: function (val) {
            this._registeredUserViews = val;
        }
    });

    /**
     * @instance
     * @name guestUserViews
     * @desc The total number of views by guest users
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'guestUserViews', {
        get: function () {
            return this._guestUserViews;
        },
        set: function (val) {
            this._guestUserViews = val;
        }
    });

    /**
     * @instance
     * @name totalViews
     * @desc The total number of views (registered users + guests)
     * @type {number}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'totalViews', {
        get: function () {
            return this._totalViews;
        },
        set: function (val) {
            this._totalViews = val;
        }
    });

    /**
     * @instance
     * @name views
     * @desc The list of viewers. List of {@link AvayaRecordingClient.Services.ReportsService.ViewerReportEntry}
     * @type {Array}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReport
     */
    Object.defineProperty(ViewerReport.prototype, 'views', {
        get: function () {
            return this._views;
        },
        set: function (val) {
            this._views = val;
        }
    });

    AvayaRecordingClient.Services.ReportsService.ViewerReport = ViewerReport;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Possible params list for getting access report.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @define AvayaRecordingClient.Services.ReportsService.AccessReportParams
     * @param {Object|undefined} accessParams - object with access report parameters
     */
    function AccessReportParams(accessParams) {
        if (accessParams) {
            /**
             * @public
             * @type {string}
             * @desc Filter programs by tenant.
             */
            this.tenantId = accessParams.tenantId || undefined;
            /**
             * @public
             * @type {number}
             * @desc Paging offset. Defaults to 0
             */
            this.offset = accessParams.offset || 0;
            /**
             * @public
             * @type {number}
             * @desc Number of results to return Defaults to 20
             */
            this.count = accessParams.count || 20;
            /**
             * @public
             * @type {string}
             * @desc Filter by the name of the owner of the program. Only tenant administrator and administrators can specify an owner name other than their own.
             *       Defaults to the name of the user whose credentials were used to access the API.
             */
            this.ownerName = accessParams.ownerName || '';
            /**
             * @public
             * @type {string}
             * @desc Filter by the category name to which the program the program belongs. The name can be partial.
             */
            this.category = accessParams.category || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only programs whose name contain this string.
             */
            this.programName = accessParams.programName || '';
            /**
             * @public
             * @type {string}
             * @desc  Filter results to only show views in the speicfied time range.  Overrides startDate and endDate (below).
             *        Must be one of the following values:
             *        LAST_DAY,
             *        LAST_WEEK,
             *        LAST_MONTH,
             *        LAST_THREE_MONTHS,
             *        LAST_SIX_MONTHS,
             *        LAST_YEAR,
             *        ALL
             */
            this.range = accessParams.range || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only show views that started after this time. Ignored if a range is specifed.
             */
            this.startDate = accessParams.startDate || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only show views that ended before this time. Ignored if a range is specified.
             */
            this.endDate = accessParams.endDate || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only views whose user agent string contains this string
             */
            this.userAgent = accessParams.userAgent || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only views where the DN used for playback had a name containing this string
             */
            this.dnName = accessParams.dnName || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only views where the DN used for playback had an address containing this string
             */
            this.dnAddress = accessParams.dnAddress || '';
            /**
             * @public
             * @type {string}
             * @desc Authorized user id.
             */
            this.user = accessParams.user || '';
        }
    }

    AccessReportParams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    AvayaRecordingClient.Services.ReportsService.AccessReportParams = AccessReportParams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * Possible params list for getting views report.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @define AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams
     * @param {Object|undefined} viewsParams - object with view report parameters
     */
    function AccessReportOneProgramParams(viewsParams) {
        if (viewsParams) {
            /**
             * @public
             * @type {number}
             * @desc Paging offset. Defaults to 0
             */
            this.offset = viewsParams.offset || 0;

            /**
             * @public
             * @type {number}
             * @desc Number of results to return Defaults to 20
             */
            this.count = viewsParams.count || 20;
            /**
             * @public
             * @type {string}
             * @desc  Filter results to only show views in the speicfied time range.  Overrides startDate and endDate (below).
             *        Must be one of the following values:
             *        LAST_DAY,
             *        LAST_WEEK,
             *        LAST_MONTH,
             *        LAST_THREE_MONTHS,
             *        LAST_SIX_MONTHS,
             *        LAST_YEAR,
             *        ALL
             */
            this.range = viewsParams.range || '';
            /**
             * @public
             * @type {number}
             * @desc Filter results to only show views that started after this time. Ignored if a range is specifed.
             */
            this.startDate = viewsParams.startDate || '';
            /**
             * @public
             * @type {number}
             * @desc Filter results to only show views that ended before this time. Ignored if a range is specified.
             */
            this.endDate = viewsParams.endDate || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only views whose user agent string contains this string
             */
            this.userAgent = viewsParams.userAgent || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only views where the DN used for playback had a name containing this string
             */
            this.dnName = viewsParams.dnName || '';
            /**
             * @public
             * @type {string}
             * @desc Filter results to only views where the DN used for playback had an address containing this string
             */
            this.dnAddress = viewsParams.dnAddress || '';
            /**
             * @public
             * @type {string}
             * @desc Authorized user id.
             */
            this.user = viewsParams.user || '';
        }
    }

    AccessReportOneProgramParams.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams = AccessReportOneProgramParams;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     *
     * ViewerReportEntry  object.
     *
     * @class
     * @constructor
     * @private
     * @memberOf AvayaRecordingClient.Services.ReportsService
     * @define AvayaRecordingClient.Services.ReportsService.ViewerReportEntry
     * @param {Object|undefined} reportEntry  - object with ViewerReportEntry properties
     */
    function ViewerReportEntry(reportEntry) {
        AvayaRecordingClient.Base.Providers.Dto.call(this);

        if (typeof reportEntry !== 'undefined' && reportEntry !== null) {
            this._username = reportEntry.username || '';
            this._guest = reportEntry.guest || undefined;
            this._clientIpAddr = reportEntry.clientIpAddr || '';
            this._location = reportEntry.location || '';

        } else {
            this._username = '';
            this._guest = undefined;
            this._clientIpAddr = '';
            this._location =  '';
        }

        this._validator = new AvayaRecordingClient.Providers.Reports.Validators.ViewerReportEntryValidator();
    }

    ViewerReportEntry.prototype = Object.create(AvayaRecordingClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name username
     * @desc The name of the viewer (null for guests)
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReportEntry
     */
    Object.defineProperty(ViewerReportEntry.prototype, 'username', {
        get: function () {
            return this._username;
        },
        set: function (val) {
            this._username = val;
        }
    });

    /**
     * @instance
     * @name username
     * @desc True if the viewer was a guest (null for non-guests)
     * @type {Boolean}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReportEntry
     */
    Object.defineProperty(ViewerReportEntry.prototype, 'guest', {
        get: function () {
            return this._guest;
        },
        set: function (val) {
            this._guest = val;
        }
    });

    /**
     * @instance
     * @name clientIpAddr
     * @desc The IP address of the viewer
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReportEntry
     */
    Object.defineProperty(ViewerReportEntry.prototype, 'clientIpAddr', {
        get: function () {
            return this._clientIpAddr;
        },
        set: function (val) {
            this._clientIpAddr = val;
        }
    });

    /**
     * @instance
     * @name location
     * @desc The location of the viewer.  This is either the name of the viewer group associated with
     *       the DN that the program was played on, or the name of the DN itself if it was not in a viewer group.
     * @type {String}
     * @memberOf AvayaRecordingClient.Services.ReportsService.ViewerReportEntry
     */
    Object.defineProperty(ViewerReportEntry.prototype, 'location', {
        get: function () {
            return this._location;
        },
        set: function (val) {
            this._location = val;
        }
    });

    AvayaRecordingClient.Services.ReportsService.ViewerReportEntry = ViewerReportEntry;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for ASSR(API 2.0) server
     * @private
     * @memberOf AvayaRecordingClient.Providers.Reports
     * @define AvayaRecordingClient.Providers.Reports.ReportsServerProvider
     */
    function ReportsServerProvider() {
        AvayaRecordingClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaRecordingClient.Providers.Reports.ReportsServerProvider';
    }

    ReportsServerProvider.prototype = Object.create(AvayaRecordingClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Reports.ReportsServerProvider#getProgramAccessRequest
     * @memberOf AvayaRecordingClient.Providers.Reports.ReportsServerProvider
     * @desc Retrieve program access reports
     * @private
     * @param {Object} opts - jQuery ajax options object
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsServerProvider.prototype.getProgramAccessRequest = function (opts) {
        arcLogger.debug(this._name + '#getProgramAccessRequest: %o', opts);

        var self = this;

        return this.setCallbacksAndSend(opts, function (response) {
            if (Array.isArray(response)) {
                var res = [];

                for (var i = 0; i < response.length; i++) {
                    res.push(new AvayaRecordingClient.Services.ReportsService.AccessReport(response[i]));
                }
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', {
                    reports : res
                });
            } else {
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response);
            }
        }, function (response) {
            arcLogger.warn(self._name + '#getProgramAccessRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Reports.ReportsServerProvider#getProgramAccessForProgramRequest
     * @memberOf AvayaRecordingClient.Providers.Reports.ReportsServerProvider
     * @desc Retrieve program access reports for a single program
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {Object}
     */
    ReportsServerProvider.prototype.getProgramAccessForProgramRequest = function (opts) {
        arcLogger.debug(this._name + '#getProgramAccessForProgramRequest: %o', opts);
        var self = this;
        return this.setCallbacksAndSend(opts, function (response) {
            if (Array.isArray(response)) {
                var res = [];

                for (var i = 0; i < response.length; i++) {
                    res.push(new AvayaRecordingClient.Services.ReportsService.AccessReport(response[i]));
                }
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', {
                    reports : res
                });
            } else {
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', response);
            }

        }, function (response) {
            arcLogger.warn(self._name + '#getProgramAccessForProgramRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    /**
     * @function AvayaRecordingClient.Providers.Reports.ReportsServerProvider#getProgramViewersRequest
     * @memberOf AvayaRecordingClient.Providers.Reports.ReportsServerProvider
     * @desc Retrieve program viewer information for a single program
     * @private
     * @param {Object} opts - jQuery ajax params object
     * @returns {Object}
     */
    ReportsServerProvider.prototype.getProgramViewersRequest = function (opts) {
        arcLogger.debug(this._name + '#getProgramViewersRequest: %o', opts);
        var self = this;
        return this.setCallbacksAndSend(opts, function (response) {
            if (Array.isArray(response)) {
                var res = [];

                for (var i = 0; i < response.length; i++) {
                    res.push(new AvayaRecordingClient.Services.ReportsService.ViewerReport(response[i]));
                }
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK', {
                    reports : res
                });
            } else {
                return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('OK',response);
            }
        }, function (response) {
            arcLogger.warn(self._name + '#getProgramViewersRequest::serverRequest fail', response);
            return new AvayaRecordingClient.Base.Responses.SimpleObjectResponse('FAIL', response);
        });
    };

    AvayaRecordingClient.Providers.Reports.ReportsServerProvider = ReportsServerProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Providers.Reports.ServerProvider
     * @classdesc SDK API layer. Main implementation class for Reports Service
     * @private
     * @memberOf AvayaRecordingClient.Providers.Reports
     * @define AvayaRecordingClient.Providers.Reports.ReportsClientProvider
     * @param {AvayaRecordingClient.Config.Resources.ProgramResources} resources
     */
    function ReportsClientProvider(resources) {
        AvayaRecordingClient.Providers.Reports.ReportsServerProvider.call(this);

        this._name = 'AvayaRecordingClient.Providers.Reports.ReportsClientProvider';

        /**
         * @private
         * @type {string}
         */
        this._resources = resources;
    }

    ReportsClientProvider.prototype = Object.create(AvayaRecordingClient.Providers.Reports.ReportsServerProvider.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Reports.ReportsClientProvider#getProgramAccessReport
     * @memberOf AvayaRecordingClient.Providers.Reports.ReportsClientProvider
     * @desc  Retrieve program access reports
     * @public
     * @param {AvayaRecordingClient.Services.ReportsService.AccessReportParams} reportParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsClientProvider.prototype.getProgramAccessReport = function (reportParams) {
        arcLogger.debug(this._name + '#getProgramAccessReport: %o', reportParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];

        opts.url = this._resources.baseUrl + this._resources.programResources.reportsUrl + '/programaccess' + new AvayaRecordingClient.Services.ReportsService.AccessReportParams(reportParams).buildUrlString();

        return this.getProgramAccessRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Reports.ReportsClientProvider#getProgramAccessReportForProgram
     * @memberOf AvayaRecordingClient.Providers.Reports.ReportsClientProvider
     * @desc Retrieve program access reports for a single program
     * @public
     * @param {string} programId
     * @param {AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams} reportParams
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsClientProvider.prototype.getProgramAccessReportForProgram = function (programId, reportParams) {
        arcLogger.debug(this._name + '#getProgramAccessReportForProgram: %s, %o', programId, reportParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'GET';

        opts.url = this._resources.baseUrl + this._resources.programResources.reportsUrl + '/programaccess/' + programId + new AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams(reportParams).buildUrlString();

        return this.getProgramAccessForProgramRequest(opts);
    };

    /**
     * @function AvayaRecordingClient.Providers.Reports.ReportsClientProvider#getProgramViewers
     * @memberOf AvayaRecordingClient.Providers.Reports.ReportsClientProvider
     * @desc Retrieve program viewer information for a single program
     * @public
     * @param {string} programId
     * @returns {AvayaRecordingClient.Base.Responses.Promise}
     */
    ReportsClientProvider.prototype.getProgramViewers = function (programId, reportParams) {
        arcLogger.debug(this._name + '#getProgramViewers: %s', programId, reportParams);

        var opts = {};
        opts.headers = {};
        opts.headers.Accept = [AvayaRecordingClient.Constants.CONTENT_TYPES.LIST,
            AvayaRecordingClient.Constants.CONTENT_TYPES.RESPONSE_DETAILS];
        opts.method = 'GET';

        opts.url = this._resources.baseUrl + this._resources.programResources.reportsUrl + '/programview/' + programId + new AvayaRecordingClient.Services.ReportsService.AccessReportParams(reportParams).buildUrlString();

        return this.getProgramViewersRequest(opts);
    };

    AvayaRecordingClient.Providers.Reports.ReportsClientProvider = ReportsClientProvider;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ReportService.AccessReport} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Reports.Validators
     * @define AvayaRecordingClient.Providers.Reports.Validators.AccessReportValidator
     */
    function AccessReportValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    AccessReportValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Reports.Validators.AccessReportValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Reports.Validators.AccessReportValidator
     * @desc Validate AccessReport object
     * @private
     * @param {AvayaRecordingClient.Services.ReportService.AccessReport} accessReport
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    AccessReportValidator.prototype.validateObject = function (accessReport) {
        var errors = [];

        if (!this.validate(accessReport.programId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programId');
        }
        if (!this.validate(accessReport.programName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programName');
        }
        if (!this.validate(accessReport.ownerName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('ownerName');
        }
        if (!this.validate(accessReport.categoryName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('categoryName');
        }
        if (!this.validate(accessReport.accessReportName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('accessReportName');
        }
        if (!this.validate(accessReport.programType, AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_TYPE)) {
            errors.push('programType');
        }
        if (!this.validate(accessReport.username, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('username');
        }
        if (!this.validate(accessReport.guest, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('guest');
        }
        if (!this.validate(accessReport.clientIpAddr, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('clientIpAddr');
        }
        if (!this.validate(accessReport.userAgent, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('userAgent');
        }
        if (!this.validate(accessReport.startDate, AvayaRecordingClient.Constants.CONDITIONS.DATE)) {
            errors.push('startDate');
        }
        if (!this.validate(accessReport.duration, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('duration');
        }
        if (!this.validate(accessReport.dnName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('dnName');
        }
        if (!this.validate(accessReport.dnAddress, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('dnAddress');
        }
        if (!this.validate(accessReport.location, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('location');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Reports.Validators.AccessReportValidator = AccessReportValidator;

})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ReportService.ViewerReport} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Reports.Validators
     * @define AvayaRecordingClient.Providers.Reports.Validators.AccessReportOneProgramValidator
     */
    function AccessReportOneProgramValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    AccessReportOneProgramValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Reports.Validators.AccessReportOneProgramValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Reports.Validators.AccessReportOneProgramValidator
     * @desc Validate ViewerReport object
     * @private
     * @param {AvayaRecordingClient.Services.ReportService.ViewerReport} viewerReport
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    AccessReportOneProgramValidator.prototype.validateObject = function (viewerReport) {
        var errors = [];
        if (!this.validate(viewerReport.programId, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programId');
        }
        if (!this.validate(viewerReport.programName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('programName');
        }
        if (!this.validate(viewerReport.ownerName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('ownerName');
        }
        if (!this.validate(viewerReport.categoryName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('categoryName');
        }
        if (!this.validate(viewerReport.tenantName, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('tenantName');
        }
        if (!this.validate(viewerReport.programType, AvayaRecordingClient.Constants.CONDITIONS.PROGRAM_TYPE)) {
            errors.push('programType');
        }
        if (!this.validate(viewerReport.registeredUserViews, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('registeredUserViews');
        }
        if (!this.validate(viewerReport.guestUserViews, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('guestUserViews');
        }
        if (!this.validate(viewerReport.totalViews, AvayaRecordingClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('totalViews');
        }

        var viewersArray = viewerReport.views;
        if (!Array.isArray(viewersArray)) {
            errors.push('views: is not an array');
        } else {
            for (var i = 0; i < viewersArray.length; i++) {
                var res = viewersArray[i].validate();
                if (!res.success) {
                    errors.push('views[' + i + ']:' + res.errors);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Reports.Validators.AccessReportOneProgramValidator = AccessReportOneProgramValidator;
})(AvayaRecordingClient);

/*
 *
 *  * Avaya Inc. Proprietary (Restricted)
 *  * Solely for authorized persons having a need to know
 *  * pursuant to company instructions.
 *  * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 *  * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 *  * The copyright notice above does not evidence any actual or
 *  * intended publication of such source code.
 *
 */

(function (AvayaRecordingClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaRecordingClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaRecordingClient.Services.ReportService.ViewerReportEntry} object
     * @private
     * @memberOf AvayaRecordingClient.Providers.Reports.Validators
     * @define AvayaRecordingClient.Providers.Reports.Validators.ViewerReportEntryValidator
     */
    function ViewerReportEntryValidator() {
        AvayaRecordingClient.Base.Providers.Validator.call(this);
    }

    ViewerReportEntryValidator.prototype = Object.create(AvayaRecordingClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaRecordingClient.Providers.Reports.Validators.ViewerReportEntryValidator#validateObject
     * @memberOf AvayaRecordingClient.Providers.Reports.Validators.ViewerReportEntryValidator
     * @desc Validate ViewerReportEntry object
     * @private
     * @param {AvayaRecordingClient.Services.ReportService.ViewerReportEntry} viewerReportEntry
     * @returns {AvayaRecordingClient.Base.Responses.ObjectValidation}
     */
    ViewerReportEntryValidator.prototype.validateObject = function (viewerReportEntry) {
        var errors = [];
        if (!this.validate(viewerReportEntry.username, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('username');
        }
        if (!this.validate(viewerReportEntry.guest, AvayaRecordingClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('guest');
        }
        if (!this.validate(viewerReportEntry.clientIpAddr, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('clientIpAddr');
        }
        if (!this.validate(viewerReportEntry.location, AvayaRecordingClient.Constants.CONDITIONS.STRING)) {
            errors.push('location');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaRecordingClient.Providers.Reports.Validators.ViewerReportEntryValidator = ViewerReportEntryValidator;
})(AvayaRecordingClient);
