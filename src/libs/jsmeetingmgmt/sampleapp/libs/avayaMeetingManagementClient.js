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
     * @classdesc Root object for Meeting Management service
     * @public
     * @memberOf window
     * @define AvayaMeetingManagementClient
     * @param {AvayaMeetingManagementClient.Config.ClientConfig} clientConfig - data object with resources for service
     *
     * @example <caption>Create JSC SDK Client instance</caption>
     *     var client = new AvayaMeetingManagementClient(clientConfig);
     */
    function AvayaMeetingManagementClient(clientConfig) {
        if (!clientConfig) {
            return false;
        }

        if (clientConfig.logger) {
            window.ammcLogger = clientConfig.logger;
        } else if (window.console) {
            window.ammcLogger = window.console;
        } else {
            alert('Console object is not exist for that browser, no default logging available then. Please provide specific Logger object.');
        }

        /**
         * @public
         * @type {AvayaMeetingManagementClient.Config.Logger}
         * @desc Optional custom logger implementation class
         * @default window.console
         */
        this.logger = clientConfig.logger || window.console;

        /**
         * @public
         * @type {AvayaMeetingManagementClient.MeetingManagementService}
         * @desc Meeting Management service instance
         */
        this.meetingManagementService = new AvayaMeetingManagementClient.MeetingManagementService(clientConfig.resources);
    }

    window.AvayaMeetingManagementClient = AvayaMeetingManagementClient;
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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *  @desc A bunch of base classes, constants, fixed objects that not depends on exact implementation or server type
     * @namespace AvayaMeetingManagementClient.Base
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.Base
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Base = AvayaMeetingManagementClient.Base || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Shared base classes that can be extended for various use
     * @namespace AvayaMeetingManagementClient.Base.Providers
     * @memberOf AvayaMeetingManagementClient.Base
     * @define AvayaMeetingManagementClient.Base.Providers
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Base.Providers = AvayaMeetingManagementClient.Base.Providers || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Constants, resources, regexp patterns e t c
     * @namespace AvayaMeetingManagementClient.Constants
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.Constants
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Constants = AvayaMeetingManagementClient.Constants || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Custom implementations for different server types, API versions and classes
     * @namespace AvayaMeetingManagementClient.Providers
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.Providers
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Providers = AvayaMeetingManagementClient.Providers || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Validator classes for all existing objects
     * @namespace AvayaMeetingManagementClient.Providers.Validators
     * @memberOf AvayaMeetingManagementClient.Providers
     * @define AvayaMeetingManagementClient.Providers.Validators
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Providers.Validators = AvayaMeetingManagementClient.Providers.Validators || {};
    })(AvayaMeetingManagementClient);

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @desc Contains prototypes of objects which are necessary to provide connection with various servers used by AvayaMeetingManagementClient SDK.
     * @namespace AvayaMeetingManagementClient.Config
     * @memberOf AvayaMeetingManagementClient
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Config = AvayaMeetingManagementClient.Config || {};
    })(AvayaMeetingManagementClient);

    /**
     * @desc Specifies response objects for various request types
     * @namespace AvayaMeetingManagementClient.Base.Responses
     * @memberOf AvayaMeetingManagementClient.Base
     */
    (function (AvayaMeetingManagementClient) {
        AvayaMeetingManagementClient.Base.Responses = AvayaMeetingManagementClient.Base.Responses || {};
    })(AvayaMeetingManagementClient);

})(AvayaMeetingManagementClient);

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

(function ($, AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base REST provider
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Providers
     * @define AvayaMeetingManagementClient.Base.Providers.RequestBuilder
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
     * @function AvayaMeetingManagementClient.Base.Providers.RequestBuilder#send
     * @memberOf AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     * @desc Send HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.send = function (opts) {
        return $.ajax(this.buildHeaders(opts));
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.RequestBuilder#buildHeaders
     * @memberOf AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     * @desc Build specified headers for HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.buildHeaders = function (opts) {
        if (this.token !== undefined){
            opts.headers.Authorization = 'UPToken ' + this.token;
        }
        return opts;
    };

    AvayaMeetingManagementClient.Base.Providers.RequestBuilder = RequestBuilder;
})(jQuery, AvayaMeetingManagementClient);

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

(function ($, AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base validator class. Provide checks for basic types and some common functions. Not a final implementation.
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Providers
     * @define AvayaMeetingManagementClient.Base.Providers.Validator
     */
    function Validator() {}

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isNumberType
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for number value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isNumberType = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isIdType
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for ID type value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isIdType = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.ID.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isStringType
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for string value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isStringType = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.STRING.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isBooleanValue
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for boolean value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isBooleanValue = function (value) {
        return AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN.test(value);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isEmptyValue
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for empty value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyValue = function (value) {
        return (value === '' || value === null || value === undefined);
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#isEmptyString
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Check for empty string
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyString = function (value) {
        return typeof value === 'string' && value.trim() === '';
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#validate
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Validate value for custom criteria using RegExp expression
     * @private
     * @param value - value to check
     * @param {RegEx} criteria - {@link AvayaMeetingManagementClient.Constants.CONDITIONS}
     * @param {boolean} isMandatory - if yes empty field will return false
     * @returns {boolean}
     */
    Validator.prototype.validate = function (value, criteria, isMandatory) {
        return criteria.test(value) || (!isMandatory && this.isEmptyValue(value));
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#errorInvalidObject
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Invalid object response as a {@link AvayaMeetingManagementClient.Base.Responses.Promise} object
     * @private
     * @param {string} - class name
     * @param {string[]} - Array of field names with error
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    Validator.prototype.errorInvalidObject = function (agent, response) {
        ammcLogger.warn(agent + ': errorInvalidObject: %o', response);
        return $.Deferred().reject(response).promise();
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#errorCustomEvent
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Return custom response as a rejected {@link AvayaMeetingManagementClient.Base.Responses.Promise} object
     * @private
     * @param {string} - class name
     * @param {Object} - custom response object
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    Validator.prototype.errorCustomEvent = function (agent, error) {
        ammcLogger.warn(agent + ': errorCustomEvent: %s', error);
        return $.Deferred().reject(error).promise();
    };

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Validator#buildValidationResponse
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Validator
     * @desc Form response object based on number errors faced during validation
     * @private
     * @param {string[]} - Array of fields with error
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    Validator.prototype.buildValidationResponse = function (errors) {
        return new AvayaMeetingManagementClient.Base.Responses.ObjectValidation(errors);
    };

    AvayaMeetingManagementClient.Base.Providers.Validator = Validator;

})(jQuery, AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base dto class for data objects.
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Providers
     * @define AvayaMeetingManagementClient.Base.Providers.Dto
     */
    function Dto() {
        /**
         * @private
         * @type {AvayaMeetingManagementClient.Providers.Validators}
         * @desc Attaching Validator object to a class
         */
        this._validator = '';
    }

    /**
     * @function AvayaMeetingManagementClient.Base.Providers.Dto#validate
     * @memberOf AvayaMeetingManagementClient.Base.Providers.Dto
     * @public
     * @returns {AvayaMeetingManagementClient.Providers.Validators}
     */
    Dto.prototype.validate = function () {
        return this._validator.validateObject(this);
    };

    AvayaMeetingManagementClient.Base.Providers.Dto = Dto;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Meeting Management Service class that contains definitions of JSC SDK API. Only public methods defined here should be used by client-side layer.
     * @public
     * @memberOf AvayaMeetingManagementClient
     * @define AvayaMeetingManagementClient.MeetingManagementService
     * @param {AvayaMeetingManagementClient.Config.Resources} resources - resources for service
     * @example <caption>Create Service instance, start it and API method call</caption>
     * //Provide Client's config usually obtained from Resource Discovery
     * var clientConfig = new AvayaMeetingManagementClient.Config.ClientConfig();
     *
     * //Custom logger if needed
     * var logger = new AvayaMeetingManagementClient.Providers.CustomLogger();
     *
     * var client = new AvayaMeetingManagementClient(clientConfig);
     * var service = client.meetingManagementService;
     * service.start();
     */
    function MeetingManagementService(resources) {

        /**
         * @public
         * @type {AvayaMeetingManagementClient.Config.Resources}
         */
        this.resources = resources;

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaMeetingManagementClient.Providers.MeetingProvider}
         */
        this._provider = undefined;

        /**
         * @private
         * @type {Boolean}
         */
        this._isStarted = false;
    }

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#isStarted
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Is Meeting Management Service instance started or not
     * @public
     * @returns {boolean}
     */
    MeetingManagementService.prototype.isStarted = function () {
        return this._isStarted;
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#start
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Start service for provided server\user data (should be performed after log in)
     * @public
     * @param {string} token - authentication token
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingManagementService.prototype.start = function (token) {
        var dfd = $.Deferred();

        AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.resources = this.resources;
        AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.token = token;

        this._provider = new AvayaMeetingManagementClient.Providers.MeetingProvider();

        this._isStarted = true;
        ammcLogger.log('Meeting Management Service has started!');

        // Nothing to fail for now
        dfd.resolve();

        return dfd.promise();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#stop
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Stop service for provided server\user data (should be performed after logout)
     * @public
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingManagementService.prototype.stop = function () {
        var dfd = $.Deferred();

        delete AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.resources;
        delete AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype.token;

        this._provider = undefined;

        this._isStarted = false;
        ammcLogger.log('Meeting Management Service has stopped!');

        // Nothing to fail for now
        dfd.resolve();

        return dfd.promise();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#createMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Schedule a new meeting
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.createMeeting(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.createMeeting = function (meeting) {
        return this._provider.createMeeting(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#updateMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Update existing meeting
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.updateMeeting(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.updateMeeting = function (meeting) {
        return this._provider.updateMeeting(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#updateOccurrence
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Update existing occurrence in meeting series
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.updateOccurrence(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.updateOccurrence = function (meeting) {
        return this._provider.updateOccurrence(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#updateSeries
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Update existing meeting series
     * @public
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.updateSeries(meeting).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.updateSeries = function (meeting) {
        return this._provider.updateSeries(meeting);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#cancelMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Cancel a meeting
     * @public
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.cancelMeeting(meetingId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.cancelMeeting = function (meetingId) {
        return this._provider.cancelMeeting(meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#terminateMeeting
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Terminate a meeting
     * @public
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.terminateMeeting(meetingId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.terminateMeeting = function (meetingId) {
        return this._provider.terminateMeeting(meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#cancelOccurrence
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Cancel occurrence in meeting series
     * @public
     * @param {number} recurrenceId
     * @param {Date|number} occurrenceStartTime
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.cancelOccurrence(recurrenceId, occurrenceStartTime).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.cancelOccurrence = function (recurrenceId, occurrenceStartTime) {
        return this._provider.cancelOccurrence(recurrenceId, occurrenceStartTime);
    };

        /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#cancelSeries
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Cancel a meeting series
     * @public
     * @param {number} recurrenceId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.cancelSeries(recurrenceId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('success');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.cancelSeries = function (recurrenceId) {
        return this._provider.cancelSeries(recurrenceId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchMeetings
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search meetings by subject and description (contains logic) and by conference number and conference id (exact match)
     * @public
     * @param {string} searchQuery
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchMeetings('Meeting room', 0, 20).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchMeetings = function (searchQuery, offset, count) {
        return this._provider.searchMeetings(searchQuery, offset, count);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingById
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meeting list by Id: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingById(meetingId).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingById = function (meetingId) {
        return this._provider.getMeetingById(meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListByDate
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meeting list by provided date: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {Date|number} date
     * @param {Boolean} fetchPastMeetings
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListByDate(1471001940172, true, false).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListByDate = function (date, fetchPastMeetings, detailed) {
        return this._provider.getMeetingListByDate(date, fetchPastMeetings, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListByPeriod
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meeting list by provided period: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {Date|number} startDate
     * @param {Date|number} endDate
     * @param {Boolean} fetchPastMeetings
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListByDate(1471001940172, 1471001980172, true, false).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListByPeriod = function (startDate, endDate, fetchPastMeetings, detailed) {
        return this._provider.getMeetingListByPeriod(startDate, endDate, fetchPastMeetings, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListIsOngoing
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get list of ongoing meetings: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListIsOngoing(false).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListIsOngoing = function (detailed) {
        return this._provider.getMeetingListIsOngoing(detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListByStatus
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get all meetings by status: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {string} status
     * @param {Boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListByStatus('FINISHED').fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListByStatus = function (status, detailed) {
        return this._provider.getMeetingListByStatus(status, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getMeetingListStartsIn
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get meetings which start by provided minutes: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @public
     * @param {number} minutes
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getMeetingListStartsIn(5, true).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     // Array of meetings
     *     console.log(response.meetings);
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getMeetingListStartsIn = function (minutes, detailed) {
        return this._provider.getMeetingListStartsIn(minutes, detailed);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getBroadcastProfiles
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get array of: {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile}
     * @public
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getBroadcastProfiles().fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getBroadcastProfiles = function () {
        return this._provider.getBroadcastProfiles();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getEndpointResourceAvailability
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get resource availability for endpoints for a day
     * @public
     * @param {number} startTime
     * @param {string[]} terminalIds
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getEndpointResourceAvailability(1471001940172, 'TERMINAL-1', 1059).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getEndpointResourceAvailability = function (startTime, terminalIds, meetingId) {
        return this._provider.getEndpointResourceAvailability(startTime, terminalIds, meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchVirtualRoomsByName
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search virtual rooms by part of VR name in specified tenant id
     * @public
     * @param {number} tenantId
     * @param {string} partOfVRName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchVirtualRoomsByName(2004, 'VR1', 0, 10).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchVirtualRoomsByName = function (tenantId, partOfVRName, offset, pageSize) {
        return this._provider.searchVirtualRoomsByName(tenantId, partOfVRName, offset, pageSize);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchVirtualRoomsByNumber
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search virtual rooms by VR number in specified tenant id
     * @public
     * @param {number} tenantId
     * @param {string} number
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchVirtualRoomsByNumber(2004, '652050001', 0, 10).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchVirtualRoomsByNumber = function (tenantId, number, offset, pageSize) {
        return this._provider.searchVirtualRoomsByNumber(tenantId, number, offset, pageSize);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#searchVirtualRoomsByUserName
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Search virtual rooms by part of user name in specified tenant id
     * @public
     * @param {number} tenantId
     * @param {string} partOfUserName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.searchVirtualRoomsByUserName(2004, 'Alex', 0, 10).fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.searchVirtualRoomsByUserName = function (tenantId, partOfUserName, offset, pageSize) {
        return this._provider.searchVirtualRoomsByUserName(tenantId, partOfUserName, offset, pageSize);
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getPropositionalData
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get propositional data (default new meeting values such as: number, duration and virtualMeetingIDPrefix) generated for meetings out of VRs
     * @public
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     * @example
     * service.getPropositionalData().fail(function (response) {
     *     console.log('fail');
     * }).done(function () {
     *     console.log('ok');
     * }).always(function () {
     *     console.log('Request logic is done.');
     * });
     */
    MeetingManagementService.prototype.getPropositionalData = function () {
        return this._provider.getPropositionalData();
    };

    /**
     * @function AvayaMeetingManagementClient.MeetingManagementService#getVideoLayoutsArray
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @desc Get array of available video layouts
     * @public
     * @returns {Object[]}
     */
    MeetingManagementService.prototype.getVideoLayoutsArray = function () {
        return this._provider.getVideoLayoutsArray();
    };

    AvayaMeetingManagementClient.MeetingManagementService = MeetingManagementService;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Monthly recurring options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @param {Object|undefined} meeting
     */
    function Meeting(meeting) {
        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof meeting !== 'undefined' && meeting !== null) {
            this._memberId = meeting.memberId || '';
            this._userId = meeting.userId || '';
            this._number = meeting.number || '';
            this._accessPIN = meeting.accessPIN || '';
            this._moderatorPIN = meeting.moderatorPIN || '';
            this._serviceTemplateId = meeting.serviceTemplateId || '';
            this._servicePrefix = meeting.servicePrefix || '';
            this._priority = meeting.priority || '';
            this._allowStreaming = meeting.allowStreaming || 'OFF';
            this._streamingStatus = meeting.streamingStatus || '';
            this.client = meeting.client || '';

            this._attendees = [];
            if (meeting.attendees) {
                if (Array.isArray(meeting.attendees)) {
                    for (var i = 0; i < meeting.attendees.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(meeting.attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(meeting.attendees));
                }
            }

            this._blockDialIn = (typeof meeting.blockDialIn === 'boolean') ? meeting.blockDialIn : false;
            this._autoExtend = (typeof meeting.autoExtend === 'boolean') ? meeting.autoExtend : false;
            this._waitingRoom = (typeof meeting.waitingRoom === 'boolean') ? meeting.waitingRoom : false;
            this._oneTimePINRequired = (typeof meeting.oneTimePINRequired === 'boolean') ? meeting.oneTimePINRequired : false;
            this._conferenceId = meeting.conferenceId || '';
            this._status = meeting.status || '';
            this._subject = meeting.subject || '';
            this._description = meeting.description || '';

            this._earlyTime = '';
            if (meeting.earlyTime) {
                try {
                    this._earlyTime = new Date(meeting.earlyTime).toISOString();
                } catch (e) {}
            }

            this._startTime = '';
            if (meeting.startTime) {
                try {
                    this._startTime = new Date(meeting.startTime).toISOString();
                } catch (e) {}
            }

            this._plannedEndTime = '';
            if (meeting.plannedEndTime) {
                try {
                    this._plannedEndTime = new Date(meeting.plannedEndTime).toISOString();
                } catch (e) {}
            }

            this._timeZoneId = meeting.timeZoneId || '';
            this._duration = meeting.duration || '';
            this._locationId = meeting.locationId || '';
            this._testOnly = (typeof meeting.testOnly === 'boolean') ? meeting.testOnly : false;
            this._sendingNotification = (typeof meeting.sendingNotification === 'boolean') ? meeting.sendingNotification : true;
            this._recordingMeetingWhenStart = (typeof meeting.recordingMeetingWhenStart === 'boolean') ? meeting.recordingMeetingWhenStart : false;
            this._recurrenceId = meeting.recurrenceId || '';
            this._eventConference = meeting.eventConference || false;
            this._panelistNumber = meeting.panelistNumber || undefined;
            this._participantLaunchURL = meeting.participantLaunchURL || '';
            this._swcLaunchURLforModerator = meeting.swcLaunchURLforModerator || '';

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(meeting.reservedPorts);
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(meeting.advancedProperties);
            this._daily = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily(meeting.daily);
            this._weekly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly(meeting.weekly);
            this._monthly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly(meeting.monthly);
            this._recurrenceEnd = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd(meeting.recurrenceEnd);
            this._broadcastSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting(meeting.broadcastSetting);
            this._mainVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(meeting.mainVideoLayout);
            this._customerVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(meeting.customerVideoLayout);
        } else {
            this._memberId = '';
            this._userId = '';
            this._number = '';
            this._accessPIN = '';
            this._moderatorPIN = '';
            this._serviceTemplateId = '';
            this._servicePrefix = '';
            this._priority = '';
            this._allowStreaming = '';
            this._streamingStatus = '';
            this._attendees = [];
            this._blockDialIn = false;
            this._autoExtend = false;
            this._waitingRoom = false;
            this._oneTimePINRequired = false;
            this._conferenceId = '';
            this._status = '';
            this._subject = '';
            this._description = '';
            this._earlyTime = '';
            this._startTime = '';
            this._plannedEndTime = '';
            this._timeZoneId = '';
            this._duration = '';
            this._locationId = '';
            this._testOnly = false;
            this._sendingNotification = true;
            this._recordingMeetingWhenStart = false;
            this._recurrenceId = '';
            this._eventConference = false;
            this._panelistNumber = undefined;
            this._participantLaunchURL = '';
            this._swcLaunchURLforModerator = '';
            this._client = '';

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts();
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties();
            this._daily = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily();
            this._weekly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly();
            this._monthly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly();
            this._recurrenceEnd = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd();
            this._broadcastSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting();
            this._mainVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout({layoutName:"MAIN"});
            this._customerVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout({layoutName:"CUSTOMER"});
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.MeetingValidator();
    }

    Meeting.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name memberId
     * @desc The organization ID, required in service provider (multi-tenant) deployments only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'memberId', {
        get : function () {
            return this._memberId;
        },
        set : function (val) {
            this._memberId = val;
        }
    });

    /**
     * @instance
     * @name userId
     * @desc The internal ID of the participant's username for users registered in Scopia® Management. If the user is defined locally within Scopia® Management, this value is the internal ID of that user. If the user is defined in an LDAP directory, this field is the GUID. This field is for users defined in Scopia Management only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'userId', {
        get : function () {
            return this._userId;
        },
        set : function (val) {
            this._userId = val;
        }
    });

    /**
     * @instance
     * @name number
     * @desc The number you dial to connect to the videoconference, composed of the service prefix and the unique number created by the conference creator.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    /**
     * @instance
     * @name accessPIN
     * @desc The PIN to access this virtual room if defined ({@link AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom}). Encoded in BASE64.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'accessPIN', {
        get : function () {
            return this._accessPIN;
        },
        set : function (val) {
            this._accessPIN = val;
        }
    });

    /**
     * @instance
     * @name moderatorPIN
     * @desc The optional PIN to take on moderator rights in videoconferences held in this virtual room. Encoded in BASE64.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'moderatorPIN', {
        get : function () {
            return this._moderatorPIN;
        },
        set : function (val) {
            this._moderatorPIN = val;
        }
    });

    /**
     * @instance
     * @name serviceTemplateId
     * @desc The ID of the meeting type (service) stored in Scopia® Management, often activated by dialing the prefix for this meeting type. Specify ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'serviceTemplateId', {
        get : function () {
            return this._serviceTemplateId;
        },
        set : function (val) {
            this._serviceTemplateId = val;
        }
    });

    /**
     * @instance
     * @name servicePrefix
     * @desc The prefix on the dial string associated with the ServiceTemplateId. Specify either ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'servicePrefix', {
        get : function () {
            return this._servicePrefix;
        },
        set : function (val) {
            this._servicePrefix = val;
        }
    });

    /**
     * @instance
     * @name priority
     * @desc Determines whether and how to cascade the videoconference. When more than one MCU is available in a distributed network, you can choose to place all participants on a central MCU, or you can cascade the meeting over several MCUs. Possible values are:
     * • DELAY - indicates Scopia® Management invites all participants directly to a main MCU, whatever their location. Scopia® Management allocates resources to ensure the best video quality. Since DELAY can be costly in terms of bandwidth, we recommend to take topology into account before selecting.
     * • LOCAL - indicates Scopia® Management invites all participants to meetings hosted on their local MCUs (according to IP topology settings). It then cascades these meetings together to form a single conference. This preserves bandwidth.
     * • UNSPECIFIED - indicates the system behaves according to the default meeting settings of Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'priority', {
        get : function () {
            return this._priority;
        },
        set : function (val) {
            this._priority = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc Determines whether this user's virtual room is able to stream a videoconference to viewers using a streaming client like VLC. Possible values are:
     * • ON indicates streaming is allowed.
     * • OFF indicates this user does not have the rights to stream a videoconference.
     * • DISABLED indicates there is no Scopia® Desktop Streaming Server to support this functionality.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'allowStreaming', {
        get : function () {
            return this._allowStreaming;
        },
        set : function (val) {
            this._allowStreaming = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc Defines whether streaming is enabled for viewing clients in an ongoing meeting. Possible values are:
     * • ON indicates streaming is enabled for this videoconference.
     * • OFF indicates streaming is disabled for this videoconference.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'streamingStatus', {
        get : function () {
            return this._streamingStatus;
        },
        set : function (val) {
            this._streamingStatus = val;
        }
    });

    /**
     * @instance
     * @name attendees
     * @desc Container tag holding details of a user or an endpoint. Endpoints are represented by the TerminalID, TerminalName, TerminalNumber, while users are represented by their UserId, FirstName, LastName and Email. You must specify at least an endpoint or a user, or you can define both.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'attendees', {
        get : function () {
            return this._attendees;
        },
        set : function (attendees) {
            this._attendees = [];
            if (attendees) {
                if (Array.isArray(attendees)) {
                    for (var i = 0; i < attendees.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees));
                }
            }
        }
    });

    /**
     * @instance
     * @name reservedPorts
     * @desc Container tag defining the number of ports (participant connections) with different resolutions reserved for this videoconference.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'reservedPorts', {
        get : function () {
            return this._reservedPorts;
        },
        set : function (reservedPorts) {
            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(reservedPorts);
        }
    });

    /**
     * @instance
     * @name blockDialIn
     * @desc BOOL indicating if others can join this videoconference by dialing in.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'blockDialIn', {
        get : function () {
            return this._blockDialIn;
        },
        set : function (val) {
            this._blockDialIn = val;
        }
    });

    /**
     * @instance
     * @name autoExtend
     * @desc BOOL indicating if the videoconference can be automatically extended.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'autoExtend', {
        get : function () {
            return this._autoExtend;
        },
        set : function (val) {
            this._autoExtend = val;
        }
    });

    /**
     * @instance
     * @name waitingRoom
     * @desc BOOL indicating whether this videoconference has waiting room functionality enabled. To receive a True response, you need to have configured a moderator PIN in the virtual room settings. You also need to have selected the Place participant in a ‘waiting room’ until the moderator joins the meeting checkbox.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'waitingRoom', {
        get : function () {
            return this._waitingRoom;
        },
        set : function (val) {
            this._waitingRoom = val;
        }
    });

    /**
     * @instance
     * @name advancedProperties
     * @desc Container tag for additional properties of this videoconference.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'advancedProperties', {
        get : function () {
            return this._advancedProperties;
        },
        set : function (advancedProperties) {
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(advancedProperties);
        }
    });

    /**
     * @instance
     * @name oneTimePINRequired
     * @desc BOOL indicating whether this videoconference (as opposed to the virtual room's default) has a PIN which must be entered for a participant to successfully join.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'oneTimePINRequired', {
        get : function () {
            return this._oneTimePINRequired;
        },
        set : function (val) {
            this._oneTimePINRequired = val;
        }
    });

    /**
     * @instance
     * @name conferenceId
     * @desc The ID of the videoconference. For recurring videoconferences, it is the ID of the generic meeting for all instances of this meeting.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'conferenceId', {
        get : function () {
            return this._conferenceId;
        },
        set : function (val) {
            this._conferenceId = val;
        }
    });

    /**
     * @instance
     * @name status
     * @desc The current status of the videoconference. We suggest leaving this field blank in this request. The response can hold one of the following values:
     * • ABNORMAL_STOPPED indicates the videoconference terminated with a significant error.
     * • CANCELLED indicates the videoconference was scheduled and then cancelled. To cancel a videoconference, see Cancel Conference on page 107.
     * • FINISHED indicates the videoconference has already ended.
     * • IN_SESSION indicates the videoconference is ongoing.
     * • NOT_START indicates the videoconference has not yet started.
     * • SCHEDULE_FAILED indicates an error while attempting to schedule this videoconference.
     * • START_FAILED indicates an error while trying to start the videoconference.
     * • STOP_FAILED indicates an error while trying to end the videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'status', {
        get : function () {
            return this._status;
        },
        set : function (val) {
            this._status = val;
        }
    });

    /**
     * @instance
     * @name subject
     * @desc The title of the videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'subject', {
        get : function () {
            return this._subject;
        },
        set : function (val) {
            this._subject = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc A longer description of the videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name earlyTime
     * @desc The format is in UTC time: YYYY-MM-DDThh:mm:ss+hh:mm, for example 2012-07-26T17:30:00+08:30. The time zone is specified as an offset of UTC, by adding a positive or negative number of hours and minutes.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'earlyTime', {
        get : function () {
            return this._earlyTime;
        },
        set : function (val) {
            this._earlyTime = val;
        }
    });

    /**
     * @instance
     * @name startTime
     * @desc specifies the start date and time of the videoconference in UTC format: YYYY-MM-DDThh:mm:ss+hh:mm
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'startTime', {
        get : function () {
            return this._startTime;
        },
        set : function (val) {
            this._startTime = val;
        }
    });

    /**
     * @instance
     * @name plannedEndTime
     * @desc specifies the planned end date and time of the videoconference in UTC format: YYYY-MM-DDThh:mm:ss+hh:mm
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'plannedEndTime', {
        get : function () {
            return this._plannedEndTime;
        },
        set : function (val) {
            this._plannedEndTime = val;
        }
    });

    /**
     * @instance
     * @name timeZoneId
     * @desc ID representing the time zone for scheduling videoconferences internationally. For example, enter the value Asia/Singapore to represent GMT+08:00.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'timeZoneId', {
        get : function () {
            return this._timeZoneId;
        },
        set : function (val) {
            this._timeZoneId = val;
        }
    });

    /**
     * @instance
     * @name duration
     * @desc The planned duration of the videoconference. Expressed as a standard duration type in XML. For example, P1H30M denotes 1 hour 15 minutes. The string is composed as follows:
     * • P is at the start of the string (mandatory) indicating the period of time.
     * • nY indicates the number of years.
     * • nM indicates the number of months.
     * • nD indicates the number of days.
     * • T indicates the start of the time section (mandatory if specifying a time).
     * • nH indicates the number of hours.
     * • nM indicates the number of minutes.
     * • nS indicates the number of seconds.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'duration', {
        get : function () {
            return this._duration;
        },
        set : function (val) {
            this._duration = val;
        }
    });

    /**
     * @instance
     * @name locationId
     * @desc The ID of the location as defined in Scopia® Management. This field is often used for branches in an organization. The videoconference is held on an MCU, where one of its properties is its location.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'locationId', {
        get : function () {
            return this._locationId;
        },
        set : function (val) {
            this._locationId = val;
        }
    });

    /**
     * @instance
     * @name testOnly
     * @desc This is used when testing the scheduling functionality, to verify resource usage. Send this request once with this value set to TRUE, to verify the resources are available, then send it again set to FALSE to actually make the booking.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'testOnly', {
        get : function () {
            return this._testOnly;
        },
        set : function (val) {
            this._testOnly = val;
        }
    });

    /**
     * @instance
     * @name sendingNotification
     * @desc BOOL indicating whether to send out an email to all participants when the videoconference is created, changed or removed from the schedule.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'sendingNotification', {
        get : function () {
            return this._sendingNotification;
        },
        set : function (val) {
            this._sendingNotification = val;
        }
    });

    /**
     * @instance
     * @name recordingMeetingWhenStart
     * @desc BOOL indicating whether recording automatically starts when the videoconference begins
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'recordingMeetingWhenStart', {
        get : function () {
            return this._recordingMeetingWhenStart;
        },
        set : function (val) {
            this._recordingMeetingWhenStart = val;
        }
    });

    /**
     * @instance
     * @name eventConference
     * @desc BOOL Indicate conference as a special “event conference”, involving up to 2,000 terminals. (Meeting Management API v.2)
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'eventConference', {
        get : function () {
            return this._eventConference;
        },
        set : function (val) {
            this._eventConference = val;
        }
    });

    /**
     * @instance
     * @name panelistNumber
     * @desc Bridge number for Event Conferencing meetings (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'panelistNumber', {
        get : function () {
            return this._panelistNumber;
        },
        set : function (val) {
            this._panelistNumber = val;
        }
    });

    /**
     * @instance
     * @name participantLaunchURL
     * @desc launch URL for common participant (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'participantLaunchURL', {
        get : function () {
            return this._participantLaunchURL;
        },
        set : function (val) {
            this._participantLaunchURL = val;
        }
    });

    /**
     * @instance
     * @name swcLaunchURLforModerator
     * @desc Web Client launch URL for moderator (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'swcLaunchURLforModerator', {
        get : function () {
            return this._swcLaunchURLforModerator;
        },
        set : function (val) {
            this._swcLaunchURLforModerator = val;
        }
    });

    /**
     * @instance
     * @name recurrenceId
     * @desc Recurrent meeting ID
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'recurrenceId', {
        get : function () {
            return this._recurrenceId;
        },
        set : function (val) {
            this._recurrenceId = val;
        }
    });

    /**
     * @instance
     * @name daily
     * @desc Container tag for videoconferences recurring every few days. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'daily', {
        get : function () {
            return this._daily;
        },
        set : function (daily) {
            this._daily = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily(daily);
        }
    });

    /**
     * @instance
     * @name weekly
     * @desc Container tag for videoconferences which recur on a weekly basis. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'weekly', {
        get : function () {
            return this._weekly;
        },
        set : function (weekly) {
            this._weekly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly(weekly);
        }
    });

    /**
     * @instance
     * @name monthly
     * @desc Container tag for videoconferences which recur on a monthly basis. For a nonrecurring meeting, omit this from the request.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'monthly', {
        get : function () {
            return this._monthly;
        },
        set : function (monthly) {
            this._monthly = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly(monthly);
        }
    });

    /**
     * @instance
     * @name recurrenceEnd
     * @desc Container tag to define the end condition of recurring videoconferences. They can end by a certain date, or after a certain number of meetings.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'recurrenceEnd', {
        get : function () {
            return this._recurrenceEnd;
        },
        set : function (recurrenceEnd) {
            this._recurrenceEnd = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd(recurrenceEnd);
        }
    });

    /**
     * @instance
     * @name broadcastSetting
     * @desc Broadcast settings object
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'broadcastSetting', {
        get : function () {
            return this._broadcastSetting;
        },
        set : function (broadcastSetting) {
            this._broadcastSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting(broadcastSetting);
        }
    });

    /**
     * @instance
     * @name mainVideoLayout
     * @desc mainVideoLayout (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'mainVideoLayout', {
        get : function () {
            return this._mainVideoLayout;
        },
        set : function (mainVideoLayout) {
            this._mainVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(mainVideoLayout);
        }
    });

    /**
     * @instance
     * @name customerVideoLayout
     * @desc customerVideoLayout (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'customerVideoLayout', {
        get : function () {
            return this._customerVideoLayout;
        },
        set : function (customerVideoLayout) {
            this._customerVideoLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout(customerVideoLayout);
        }
    });

    /**
     * @instance
     * @name client
     * @desc client which was used to schedule this meeting
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     */
    Object.defineProperty(Meeting.prototype, 'client', {
        get : function () {
            return this._client;
        },
        set : function (client) {
            this._client = client;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting = Meeting;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Class that represents virtual room instance
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     * @param {Object|undefined} virtualRoom
     */
    function VirtualRoom(virtualRoom) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof virtualRoom !== 'undefined' && virtualRoom !== null) {
            this._memberId = virtualRoom.memberId || '';
            this._virtualRoomId = virtualRoom.virtualRoomId || '';
            this._number = virtualRoom.number || '';
            this._accessPIN = virtualRoom.accessPIN || '';
            this._moderatorPIN = virtualRoom.moderatorPIN || '';
            this._serviceTemplateId = virtualRoom.serviceTemplateId || '';
            this._servicePrefix = virtualRoom.servicePrefix || '';
            this._priority = virtualRoom.priority || '';
            this._allowStreaming = virtualRoom.allowStreaming || false;
            this._streamingStatus = virtualRoom.streamingStatus || '';

            this._attendees = [];
            if (virtualRoom.attendee) {
                if (Array.isArray(virtualRoom.attendee)) {
                    for (var i = 0; i < virtualRoom.attendee.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(virtualRoom.attendee[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(virtualRoom.attendee));
                }
            }

            this._blockDialIn = virtualRoom.blockDialIn || false;
            this._autoExtend = virtualRoom.autoExtend || false;
            this._waitingRoom = virtualRoom.waitingRoom || false;
            this._oneTimePINRequired = virtualRoom.oneTimePINRequired || false;
            this._name = virtualRoom.name || '';
            this._description = virtualRoom.description || '';
            this._allowRecording = virtualRoom.allowRecording || false;
            this._defaultRoom = virtualRoom.defaultRoom || false;
            this._publicRoom = virtualRoom.publicRoom || false;
            this._maxParticipants = virtualRoom.maxParticipants || '';
            this._allowKnocking = virtualRoom.allowKnocking || false;
            this._allowInstantMeeting = virtualRoom.allowInstantMeeting || false;

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(virtualRoom.reservedPorts);
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(virtualRoom.advancedProperties);

        } else {
            this._memberId = '';
            this._virtualRoomId = '';
            this._number = '';
            this._accessPIN = '';
            this._moderatorPIN = '';
            this._serviceTemplateId = '';
            this._servicePrefix = '';
            this._priority = '';
            this._allowStreaming = false;
            this._streamingStatus = '';
            this._attendees = [];
            this._blockDialIn = false;
            this._autoExtend = false;
            this._waitingRoom = false;
            this._oneTimePINRequired = false;
            this._name = '';
            this._description = '';
            this._allowRecording = false;
            this._defaultRoom = false;
            this._publicRoom = false;
            this._maxParticipants = '';
            this._allowKnocking = false;
            this._allowInstantMeeting = false;

            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts();
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties();
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator();
    }

    VirtualRoom.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name memberId
     * @desc The organization ID, required in service provider (multi-tenant) deployments only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'memberId', {
        get : function () {
            return this._memberId;
        },
        set : function (val) {
            this._memberId = val;
        }
    });

    /**
     * @instance
     * @name virtualRoomId
     * @desc The ID of the virtual room.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'virtualRoomId', {
        get : function () {
            return this._virtualRoomId;
        },
        set : function (val) {
            this._virtualRoomId = val;
        }
    });

    /**
     * @instance
     * @name number
     * @desc Number to dial to access this virtual room, without any prefixes which determine the meeting type. This number does not include any dial prefixes to activate a meeting type.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    /**
     * @instance
     * @name accessPIN
     * @desc The PIN to access this virtual room if defined. Encoded in BASE64.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'accessPIN', {
        get : function () {
            return this._accessPIN;
        },
        set : function (val) {
            this._accessPIN = val;
        }
    });

    /**
     * @instance
     * @name moderatorPIN
     * @desc The optional PIN to take on moderator rights in videoconferences held in this virtual room. Encoded in BASE64.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'moderatorPIN', {
        get : function () {
            return this._moderatorPIN;
        },
        set : function (val) {
            this._moderatorPIN = val;
        }
    });

    /**
     * @instance
     * @name serviceTemplateId
     * @desc The ID of the meeting type (service) stored in Scopia® Management, often activated by dialing the prefix for this meeting type. Specify ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'serviceTemplateId', {
        get : function () {
            return this._serviceTemplateId;
        },
        set : function (val) {
            this._serviceTemplateId = val;
        }
    });

    /**
     * @instance
     * @name servicePrefix
     * @desc The prefix on the dial string associated with the ServiceTemplateId. Specify either ServiceTemplateId or ServicePrefix. Scopia® Management only needs one of these values to find the meeting type.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'servicePrefix', {
        get : function () {
            return this._servicePrefix;
        },
        set : function (val) {
            this._servicePrefix = val;
        }
    });

    /**
     * @instance
     * @name priority
     * @desc Determines whether and how to cascade the videoconference. When more than one MCU is available in a distributed network, you can choose to place all participants on a central MCU, or you can cascade the meeting over several MCUs. Possible values are:
     * • DELAY indicates Scopia® Management invites all participants directly to a main MCU, whatever their location. Scopia® Management allocates resources to ensure the best video quality. Since DELAY can be costly in terms of bandwidth, we recommend to take topology into account before selecting.
     * • LOCAL indicates Scopia® Management invites all participants to meetings hosted on their local MCUs (according to IP topology settings). It then cascades these meetings together to form a single conference. This preserves bandwidth.
     * • UNSPECIFIED indicates the system behaves according to the default meeting settings of Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'priority', {
        get : function () {
            return this._priority;
        },
        set : function (val) {
            this._priority = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc Determines whether this user's virtual room is able to stream a videoconference to viewers using a streaming client like VLC. Possible values are:
     * • ON indicates streaming is allowed.
     * • OFF indicates this user does not have the rights to stream a videoconference.
     * • DISABLED indicates there is no Scopia® Desktop Streaming Server to support this functionality.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowStreaming', {
        get : function () {
            return this._allowStreaming;
        },
        set : function (val) {
            this._allowStreaming = val;
        }
    });

    /**
     * @instance
     * @name streamingStatus
     * @desc Defines whether streaming is enabled for viewing clients in an ongoing meeting. Possible values are:
     * • ON indicates streaming is enabled for this videoconference.
     * • OFF indicates streaming is disabled for this videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'streamingStatus', {
        get : function () {
            return this._streamingStatus;
        },
        set : function (val) {
            this._streamingStatus = val;
        }
    });

    /**
     * @instance
     * @name attendees
     * @desc Container tag holding details of a user or an endpoint. Endpoints are represented by the TerminalID, TerminalName, TerminalNumber, while users are represented by their UserId, FirstName, LastName and Email. You must specify at least an endpoint or a user, or you can define both.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'attendees', {
        get : function () {
            return this._attendees;
        },
        set : function (attendees) {
            this._attendees = [];
            if (attendees) {
                if (Array.isArray(attendees)) {
                    for (var i = 0; i < attendees.length; i++) {
                        this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee(attendees));
                }
            }
        }
    });

    /**
     * @instance
     * @name reservedPorts
     * @desc This Container tag defines the default number of ports (participant connections) with different resolutions reserved by this virtual room.
     * @type {AvayaVirtualRoomManagementClient.VirtualRoomManagementService.VirtualRoom.ReservedPorts}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'reservedPorts', {
        get : function () {
            return this._reservedPorts;
        },
        set : function (reservedPorts) {
            this._reservedPorts = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts(reservedPorts);
        }
    });

    /**
     * @instance
     * @name blockDialIn
     * @desc BOOL indicating if others can join this videoconference by dialing in.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'blockDialIn', {
        get : function () {
            return this._blockDialIn;
        },
        set : function (val) {
            this._blockDialIn = val;
        }
    });

    /**
     * @instance
     * @name autoExtend
     * @desc BOOL indicating if the videoconference can be automatically extended.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'autoExtend', {
        get : function () {
            return this._autoExtend;
        },
        set : function (val) {
            this._autoExtend = val;
        }
    });

    /**
     * @instance
     * @name waitingRoom
     * @desc BOOL indicating whether this videoconference has waiting room functionality enabled. To receive a True response, you need to have configured a moderator PIN in the virtual room settings. You also need to have selected the Place participant in a ‘waiting room’ until the moderator joins the meeting checkbox.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'waitingRoom', {
        get : function () {
            return this._waitingRoom;
        },
        set : function (val) {
            this._waitingRoom = val;
        }
    });

    /**
     * @instance
     * @name advancedProperties
     * @desc Container tag for additional properties of the default videoconference settings for this virtual room.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'advancedProperties', {
        get : function () {
            return this._advancedProperties;
        },
        set : function (advancedProperties) {
            this._advancedProperties = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties(advancedProperties);
        }
    });

    /**
     * @instance
     * @name oneTimePINRequired
     * @desc BOOL indicating whether this videoconference (as opposed to the virtual room's default) has a PIN which must be entered for a participant to successfully join.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'oneTimePINRequired', {
        get : function () {
            return this._oneTimePINRequired;
        },
        set : function (val) {
            this._oneTimePINRequired = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc The name of this virtual room.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'name', {
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
     * @desc The description of this virtual room.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name allowRecording
     * @desc BOOL indicating whether this user's virtual room can record a videoconference. Possible values are:
     * • ON indicates recording is allowed.
     * • OFF indicates this user does not have the rights to record a videoconference.
     * • DISABLED indicates the recording server cannot be found in this network.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowRecording', {
        get : function () {
            return this._allowRecording;
        },
        set : function (val) {
            this._allowRecording = val;
        }
    });

    /**
     * @instance
     * @name defaultRoom
     * @desc BOOL indicating if this virtual room is the user's default room.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'defaultRoom', {
        get : function () {
            return this._defaultRoom;
        },
        set : function (val) {
            this._defaultRoom = val;
        }
    });

    /**
     * @instance
     * @name publicRoom
     * @desc BOOL indicating if this virtual room is publicly accessible.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'publicRoom', {
        get : function () {
            return this._publicRoom;
        },
        set : function (val) {
            this._publicRoom = val;
        }
    });

    /**
     * @instance
     * @name maxParticipants
     * @desc The maximum number of participants allowed in this virtual room.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'maxParticipants', {
        get : function () {
            return this._maxParticipants;
        },
        set : function (val) {
            this._maxParticipants = val;
        }
    });

    /**
     * @instance
     * @name allowKnocking
     * @desc BOOL indicating is knocking allowed.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowKnocking', {
        get : function () {
            return this._allowKnocking;
        },
        set : function (val) {
            this._allowKnocking = val;
        }
    });

    /**
     * @instance
     * @name allowInstantMeeting
     * @desc BOOL indicating is instant meeting allowed.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom
     */
    Object.defineProperty(VirtualRoom.prototype, 'allowInstantMeeting', {
        get : function () {
            return this._allowInstantMeeting;
        },
        set : function (val) {
            this._allowInstantMeeting = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom = VirtualRoom;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Attendee object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     * @param {Object|undefined} attendee
     */
    function Attendee(attendee) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof attendee !== 'undefined' && attendee !== null) {
            this._terminalId = attendee.terminalId || '';
            this._protocol = attendee.protocol || '';
            this._terminalName = attendee.terminalName || '';
            this._terminalNumber = attendee.terminalNumber || '';
            this._maxBandwidth = attendee.maxBandwidth || '';
            this._maxISDNBandwidth = attendee.maxISDNBandwidth || '';
            this._areaCode = attendee.areaCode || '';
            this._countryCode = attendee.countryCode || '';
            this._telephoneNumber = attendee.telephoneNumber || '';
            this._restrictedMode = attendee.restrictedMode || false;
            this._threeG = attendee.threeG || false;
            this._voiceOnly = attendee.voiceOnly || false;
            this._userId = attendee.userId || '';
            this._firstName = attendee.firstName || '';
            this._lastName = attendee.lastName || '';
            this._email = attendee.email || '';
            this._organizer = attendee.organizer || false;
            this._host = attendee.host || false;
            this._needOnMaster = attendee.needOnMaster || false;
            this._autoDialIn = attendee.autoDialIn || false;
            this._mainPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout(attendee.mainPartyInLayout);
            this._customerPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout(attendee.customerPartyInLayout || {layoutName:"CUSTOMER"});
            this._partyOutLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout(attendee.partyOutLayout);
            this._panelist = attendee.panelist || false;
        } else {
            this._terminalId = '';
            this._protocol = '';
            this._terminalName = '';
            this._terminalNumber = '';
            this._maxBandwidth = '';
            this._maxISDNBandwidth = '';
            this._areaCode = '';
            this._countryCode = '';
            this._telephoneNumber = '';
            this._restrictedMode = false;
            this._threeG = false;
            this._voiceOnly = false;
            this._userId = '';
            this._firstName = '';
            this._lastName = '';
            this._email = '';
            this._organizer = false;
            this._host = false;
            this._needOnMaster = false;
            this._autoDialIn = false;
            this._mainPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout({layoutName:"MAIN"});
            this._customerPartyInLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout({layoutName:"CUSTOMER"});
            this._partyOutLayout = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout({layoutName:"MAIN"});
            this._panelist = false;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AttendeeValidator();
    }

    Attendee.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name terminalId
     * @desc The ID of an endpoint defined in Scopia® Management.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'terminalId', {
        get : function () {
            return this._terminalId;
        },
        set : function (val) {
            this._terminalId = val;
        }
    });

    /**
     * @instance
     * @name protocol
     * @desc The protocol used for conferencing with the invited endpoint. Possible values are:
     * • H323 for endpoints supporting H.323 (e.g. XT Series or Scopia® Desktop Client).
     * • ISDN for ISDN-compatible endpoints.
     * • SIP for endpoints supporting the SIP protocol (e.g. XT Series).
     * • DUAL for endpoints supporting both H.323 and ISDN endpoints.
     * • MOBILE for mobile phones (e.g. 3G, 2G).
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'protocol', {
        get : function () {
            return this._protocol;
        },
        set : function (val) {
            this._protocol = val;
        }
    });

    /**
     * @instance
     * @name terminalName
     * @desc The name of the endpoint as defined within Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'terminalName', {
        get : function () {
            return this._terminalName;
        },
        set : function (val) {
            this._terminalName = val;
        }
    });

    /**
     * @instance
     * @name terminalNumber
     * @desc The SIP or H.323 dial string used to reach this endpoint. This can be used for both internal endpoints registered within Scopia® Management, or external endpoints. For external endpoints, the number is its primary identifier.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'terminalNumber', {
        get : function () {
            return this._terminalNumber;
        },
        set : function (val) {
            this._terminalNumber = val;
        }
    });

    /**
     * @instance
     * @name maxBandwidth
     * @desc The maximum bandwidth available for this endpoint. Optional, since the service (meeting type) also defines bandwidth limitations.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'maxBandwidth', {
        get : function () {
            return this._maxBandwidth;
        },
        set : function (val) {
            this._maxBandwidth = val;
        }
    });

    /**
     * @instance
     * @name maxISDNBandwidth
     * @desc The maximum bandwidth available over an ISDN or mobile connection.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'maxISDNBandwidth', {
        get : function () {
            return this._maxISDNBandwidth;
        },
        set : function (val) {
            this._maxISDNBandwidth = val;
        }
    });

    /**
     * @instance
     * @name areaCode
     * @desc Area code for dialing this endpoint, when it is an ISDN or 3G endpoint.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'areaCode', {
        get : function () {
            return this._areaCode;
        },
        set : function (val) {
            this._areaCode = val;
        }
    });

    /**
     * @instance
     * @name countryCode
     * @desc Country code for dialing this endpoint, when it is an ISDN or 3G endpoint.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'countryCode', {
        get : function () {
            return this._countryCode;
        },
        set : function (val) {
            this._countryCode = val;
        }
    });

    /**
     * @instance
     * @name telephoneNumber
     * @desc Telephone number to dial this endpoint, when it is an ISDN or 3G endpoint.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'telephoneNumber', {
        get : function () {
            return this._telephoneNumber;
        },
        set : function (val) {
            this._telephoneNumber = val;
        }
    });

    /**
     * @instance
     * @name restrictedMode
     * @desc Determines whether this endpoint operates in restricted mode, where the top 8K of each packet is reserved by the ISDN PBX for control data. For ISDN endpoints only.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'restrictedMode', {
        get : function () {
            return this._restrictedMode;
        },
        set : function (val) {
            this._restrictedMode = val;
        }
    });

    /**
     * @instance
     * @name threeG
     * @desc BOOL indicating whether this is a 3G endpoint.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'threeG', {
        get : function () {
            return this._threeG;
        },
        set : function (val) {
            this._threeG = val;
        }
    });

    /**
     * @instance
     * @name voiceOnly
     * @desc BOOL indicating whether this is a voice-only endpoint.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'voiceOnly', {
        get : function () {
            return this._voiceOnly;
        },
        set : function (val) {
            this._voiceOnly = val;
        }
    });

    /**
     * @instance
     * @name userId
     * @desc The internal ID of the participant's username for users registered in Scopia® Management. If the user is defined locally within Scopia® Management, this value is the internal ID of that user. If the user is defined in an LDAP directory, this field is the GUID. This field is for users defined in Scopia Management only.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'userId', {
        get : function () {
            return this._userId;
        },
        set : function (val) {
            this._userId = val;
        }
    });

    /**
     * @instance
     * @name firstName
     * @desc Optional. The first name of the participant.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'firstName', {
        get : function () {
            return this._firstName;
        },
        set : function (val) {
            this._firstName = val;
        }
    });

    /**
     * @instance
     * @name lastName
     * @desc The family name of the participant. This field or the Email is required for external participants.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'lastName', {
        get : function () {
            return this._lastName;
        },
        set : function (val) {
            this._lastName = val;
        }
    });

    /**
     * @instance
     * @name email
     * @desc The email address of the participant. This is required for external participants when the LastName is absent.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'email', {
        get : function () {
            return this._email;
        },
        set : function (val) {
            this._email = val;
        }
    });

    /**
     * @instance
     * @name organizer
     * @desc BOOL indicating whether this participant is the designated organizer of the videoconference.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'organizer', {
        get : function () {
            return this._organizer;
        },
        set : function (val) {
            this._organizer = val;
        }
    });

    /**
     * @instance
     * @name host
     * @desc BOOL indicating whether this participant is hosting the videoconference.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'host', {
        get : function () {
            return this._host;
        },
        set : function (val) {
            this._host = val;
        }
    });

    /**
     * @instance
     * @name needOnMaster
     * @desc Allocate resources for this attendee on master MCU
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'needOnMaster', {
        get : function () {
            return this._needOnMaster;
        },
        set : function (val) {
            this._needOnMaster = val;
        }
    });

    /**
     * @instance
     * @name autoDialIn
     * @desc It can call to the endpoint on meeting start automatically
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'autoDialIn', {
        get : function () {
            return this._autoDialIn;
        },
        set : function (val) {
            this._autoDialIn = val;
        }
    });

    /**
     * @instance
     * @name mainPartyInLayout
     * @desc It describes attendee's position in main video layout (Meeting Management API v.2)
     * @type AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'mainPartyInLayout', {
        get : function () {
            return this._mainPartyInLayout;
        },
        set : function (val) {
            this._mainPartyInLayout = val;
        }
    });

    /**
     * @instance
     * @name customerPartyInLayout
     * @desc It describes attendee's position in custom video layout (Meeting Management API v.2)
     * @type AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'customerPartyInLayout', {
        get : function () {
            return this._customerPartyInLayout;
        },
        set : function (val) {
            this._customerPartyInLayout = val;
        }
    });

    /**
     * @instance
     * @name partyOutLayout
     * @desc Describe which layout is applicable for the user - "MAIN" or "CUSTOMER" (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'partyOutLayout', {
        get : function () {
            return this._partyOutLayout;
        },
        set : function (val) {
            this._partyOutLayout = val;
        }
    });

    /**
     * @instance
     * @name panelist
     * @desc Show whether the user is in a panelist (VIP) (Meeting Management API v.2)
     * @type {boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'panelist', {
        get : function () {
            return this._panelist;
        },
        set : function (val) {
            this._panelist = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee = Attendee;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Reserved Ports object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     * @param {Object|undefined} reservedPorts
     */
    function ReservedPorts(reservedPorts) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof reservedPorts !== 'undefined' && reservedPorts !== null) {
            this._regular = reservedPorts.regular || '';
            this._sd = reservedPorts.sd || '';
            this._hd = reservedPorts.hd || '';
            this._fullHD = reservedPorts.fullHD || '';
            this._audioOnlyWC = reservedPorts.audioOnlyWC || '';
        } else {
            this._regular = '';
            this._sd = '';
            this._hd = '';
            this._fullHD = '';
            this._audioOnlyWC = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.ReservedPortsValidator();
    }

    ReservedPorts.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name regular
     * @desc Number of ports reserved at the default resolution for this meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'regular', {
        get : function () {
            return this._regular;
        },
        set : function (val) {
            this._regular = val;
        }
    });

    /**
     * @instance
     * @name sd
     * @desc Number of ports reserved at standard resolution, as defined by the meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'sd', {
        get : function () {
            return this._sd;
        },
        set : function (val) {
            this._sd = val;
        }
    });

    /**
     * @instance
     * @name hd
     * @desc Number of ports reserved at high definition, as defined by the meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'hd', {
        get : function () {
            return this._hd;
        },
        set : function (val) {
            this._hd = val;
        }
    });

    /**
     * @instance
     * @name fullHD
     * @desc Number of ports reserved at full HD, as defined by the meeting type on the MCU.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'fullHD', {
        get : function () {
            return this._fullHD;
        },
        set : function (val) {
            this._fullHD = val;
        }
    });

    /**
     * @instance
     * @name audioOnlyWC
     * @desc reserve audio + web collab ports (Meeting Management API v.2)
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'audioOnlyWC', {
        get : function () {
            return this._audioOnlyWC;
        },
        set : function (val) {
            this._audioOnlyWC = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts = ReservedPorts;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Advanced Properties object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     * @param {Object|undefined} advancedProperties
     */
    function AdvancedProperties(advancedProperties) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof advancedProperties !== 'undefined' && advancedProperties !== null) {
            this._durationAfterLeft = advancedProperties.durationAfterLeft || '';
            this._terminationCondition = advancedProperties.terminationCondition || '';
            this._maxParticipants = advancedProperties.maxParticipants || '';
            this._minutesBeforeTermination = advancedProperties.minutesBeforeTermination || '';
        } else {
            this._durationAfterLeft = '';
            this._terminationCondition = '';
            this._maxParticipants = '';
            this._minutesBeforeTermination = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AdvancedPropertiesValidator();
    }

    AdvancedProperties.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name durationAfterLeft
     * @desc The amount of time a videoconference can continue after the host has departed. Expressed as a standard duration type in XML. For example, P1H30M denotes 1 hour 15 minutes. The string is composed as follows:
     * • P is at the start of the string (mandatory) indicating the period of time.
     * • nY indicates the number of years.
     * • nM indicates the number of months.
     * • nD indicates the number of days.
     * • T indicates the start of the time section (mandatory if specifying a time).
     * • nH indicates the number of hours.
     * • nM indicates the number of minutes.
     * • nS indicates the number of seconds.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'durationAfterLeft', {
        get : function () {
            return this._durationAfterLeft;
        },
        set : function (val) {
            this._durationAfterLeft = val;
        }
    });

    /**
     * @instance
     * @name terminationCondition
     * @desc The conditions under which a videoconference automatically ends. Possible values are:
     * • NORMAL indicates the videoconference automatically ends according to the system's default meeting settings
     * • AFTER_ALL_PARTIES_LEFT indicates the videoconference automatically ends when all participants have exited
     * • AFTER_HOST_LEFT indicates the videoconference automatically ends when the host exits from the meeting
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'terminationCondition', {
        get : function () {
            return this._terminationCondition;
        },
        set : function (val) {
            this._terminationCondition = val;
        }
    });

    /**
     * @instance
     * @name maxParticipants
     * @desc The maximum number of participants allowed in this videoconference.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'maxParticipants', {
        get : function () {
            return this._maxParticipants;
        },
        set : function (val) {
            this._maxParticipants = val;
        }
    });

    /**
     * @instance
     * @name minutesBeforeTermination
     * @desc Delay for warning before meeting ends.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'minutesBeforeTermination', {
        get : function () {
            return this._minutesBeforeTermination;
        },
        set : function (val) {
            this._minutesBeforeTermination = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties = AdvancedProperties;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Daily recurring options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily
     * @param {Object|undefined} daily
     */
    function Daily(daily) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof daily !== 'undefined' && daily !== null) {
            this._numberOfEveryDay = daily.numberOfEveryDay || '';
            this._everyWeekDay = daily.everyWeekDay || false;
        } else {
            this._numberOfEveryDay = '';
            this._everyWeekDay = false;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.DailyValidator();
    }

    Daily.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name everyWeekDay
     * @desc BOOL indicating if it recurs every weekday.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily
     */
    Object.defineProperty(Daily.prototype, 'everyWeekDay', {
        get : function () {
            return this._everyWeekDay;
        },
        set : function (val) {
            this._everyWeekDay = val;
        }
    });

    /**
     * @instance
     * @name numberOfEveryDay
     * @desc Number indicating the videoconference recurs every x days.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily
     */
    Object.defineProperty(Daily.prototype, 'numberOfEveryDay', {
        get : function () {
            return this._numberOfEveryDay;
        },
        set : function (val) {
            this._numberOfEveryDay = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily = Daily;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Weekly recurrence object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly
     * @param {Object|undefined} weekly
     */
    function Weekly(weekly) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof weekly !== 'undefined' && weekly !== null) {
            this._numberOfEveryWeek = weekly.numberOfEveryWeek || '';
            this._daysOfWeek = weekly.daysOfWeek || [];
        } else {
            this._numberOfEveryWeek = '';
            this._daysOfWeek = [];
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.WeeklyValidator();
    }

    Weekly.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name numberOfEveryWeek
     * @desc Number indicating the videoconference recurs every x weeks.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly
     */
    Object.defineProperty(Weekly.prototype, 'numberOfEveryWeek', {
        get : function () {
            return this._numberOfEveryWeek;
        },
        set : function (val) {
            this._numberOfEveryWeek = val;
        }
    });

    /**
     * @instance
     * @name daysOfWeek
     * @desc Videoconference recurs on specific days of the week. This can be one or more days, where each day has its own tag. For example:
     * <DayOfWeek>MON</DayOfWeek>
     * <DayOfWeek>THU</DayOfWeek>
     * @type {Array}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly
     */
    Object.defineProperty(Weekly.prototype, 'daysOfWeek', {
        get : function () {
            return this._daysOfWeek;
        },
        set : function (val) {
            this._daysOfWeek = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly = Weekly;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Monthly recurring options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     * @param {Object|undefined} monthly
     */
    function Monthly(monthly) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof monthly !== 'undefined' && monthly !== null) {
            this._numberOfEveryMonth = monthly.numberOfEveryMonth || '';
            this._dayOfMonth = monthly.dayOfMonth || '';
            this._dayOfNumberOfEveryMonth = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth(monthly.dayOfNumberOfEveryMonth);
        } else {
            this._numberOfEveryMonth = '';
            this._dayOfMonth = '';
            this._dayOfNumberOfEveryMonth = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth();
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.MonthlyValidator();
    }

    Monthly.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name numberOfEveryMonth
     * @desc Number indicating the videoconference recurs every x months.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     */
    Object.defineProperty(Monthly.prototype, 'numberOfEveryMonth', {
        get : function () {
            return this._numberOfEveryMonth;
        },
        set : function (val) {
            this._numberOfEveryMonth = val;
        }
    });

    /**
     * @instance
     * @name dayOfMonth
     * @desc Number indicating the videoconference recurs on the xth of every month.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     */
    Object.defineProperty(Monthly.prototype, 'dayOfMonth', {
        get : function () {
            return this._dayOfMonth;
        },
        set : function (val) {
            this._dayOfMonth = val;
        }
    });

    /**
     * @instance
     * @name dayOfNumberOfEveryMonth
     * @desc Container tag for videoconferences recuring on the xth week in the month on a given day. For example, the third Sunday of every month.
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     */
    Object.defineProperty(Monthly.prototype, 'dayOfNumberOfEveryMonth', {
        get : function () {
            return this._dayOfNumberOfEveryMonth;
        },
        set : function (val) {
            this._dayOfNumberOfEveryMonth = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth(dayOfNumberOfEveryMonth);
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly = Monthly;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Recurrence end options object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd
     * @param {Object|undefined} recurrenceEnd
     */
    function RecurrenceEnd(recurrenceEnd) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof recurrenceEnd !== 'undefined' && recurrenceEnd !== null) {
            this._endOfOccurrences = recurrenceEnd.endOfOccurrences || '';

            this._by = '';
            if (recurrenceEnd.by) {
                try {
                    this._by = new Date(recurrenceEnd.by).toISOString();
                } catch (e) {}
            }
        } else {
            this._endOfOccurrences = '';
            this._by = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.RecurrenceEndValidator();
    }

    RecurrenceEnd.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name endOfOccurrences
     * @desc Number indicating the videoconference stops recurring after x meetings.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd
     */
    Object.defineProperty(RecurrenceEnd.prototype, 'endOfOccurrences', {
        get : function () {
            return this._endOfOccurrences;
        },
        set : function (val) {
            this._endOfOccurrences = val;
        }
    });

    /**
     * @instance
     * @name by
     * @desc The end date of the recurring videoconference. The format is in UTC time: YYYY-MM-DDThh:mm:ss+hh:mm, for example 2012-07-26T17:30:00+08:30. The time zone is specified as an offset of UTC, by adding a positive or negative number of hours and minutes.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd
     */
    Object.defineProperty(RecurrenceEnd.prototype, 'by', {
        get : function () {
            return this._by;
        },
        set : function (val) {
            this._by = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd = RecurrenceEnd;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Day Of Number Of Every Month settings for monthly recurring object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth
     * @param {Object|undefined} dayOfNumberOfEveryMonth
     */
    function DayOfNumberOfEveryMonth(dayOfNumberOfEveryMonth) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof dayOfNumberOfEveryMonth !== 'undefined' && dayOfNumberOfEveryMonth !== null) {
            this._weekOfMonth = dayOfNumberOfEveryMonth.weekOfMonth || '';
            this._dayOfWeek = dayOfNumberOfEveryMonth.dayOfWeek || [];
        } else {
            this._weekOfMonth = '';
            this._dayOfWeek = [];
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator();
    }

    DayOfNumberOfEveryMonth.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name weekOfMonth
     * @desc A string to determine which week of the month it recurs: FIRST, SECOND, THIRD, FOURTH or LAST. For example, if it recurs on the third Sunday of every month, the value is THIRD.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth
     */
    Object.defineProperty(DayOfNumberOfEveryMonth.prototype, 'weekOfMonth', {
        get : function () {
            return this._weekOfMonth;
        },
        set : function (val) {
            this._weekOfMonth = val;
        }
    });

    /**
     * @instance
     * @name dayOfWeek
     * @desc Videoconference recurs on specific days of the week. For example: "MON"
     * @type {string[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth
     */
    Object.defineProperty(DayOfNumberOfEveryMonth.prototype, 'dayOfWeek', {
        get : function () {
            return this._dayOfWeek;
        },
        set : function (val) {
            this._dayOfWeek = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth = DayOfNumberOfEveryMonth;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Broadcast Settings object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     * @param {Object|undefined} broadcastSetting
     */
    function BroadcastSetting(broadcastSetting) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof broadcastSetting !== 'undefined' && broadcastSetting !== null) {
            this._subject = broadcastSetting.subject || '';
            this._pin = broadcastSetting.pin || '';
            this._thumbnail = broadcastSetting.thumbnail || '';
            this._thumbnailMimeType = broadcastSetting.thumbnailMimeType || '';
            this._profile = broadcastSetting.profile || '';
            this._description = broadcastSetting.description || '';
            this._public = broadcastSetting.public || false;
            this._questionsAndAnswersEnabled = broadcastSetting.questionsAndAnswersEnabled || false;
            this._moderatorPIN = broadcastSetting.moderatorPIN || '';
            this._programId = broadcastSetting.programId || '';
            this._accessModeSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting(broadcastSetting.accessModeSetting);
        } else {
            this._subject = '';
            this._pin = '';
            this._thumbnail = '';
            this._thumbnailMimeType = '';
            this._profile = '';
            this._description = '';
            this._public = false;
            this._questionsAndAnswersEnabled = false;
            this._moderatorPIN = '';
            this._programId = '';
            this._accessModeSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting();
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator();
    }

    BroadcastSetting.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name subject
     * @desc Subject of broadcast
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'subject', {
        get : function () {
            return this._subject;
        },
        set : function (val) {
            this._subject = val;
        }
    });

    /**
     * @instance
     * @name pin
     * @desc PIN to join to this broadcast
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'pin', {
        get : function () {
            return this._pin;
        },
        set : function (val) {
            this._pin = val;
        }
    });

    /**
     * @instance
     * @name thumbnail
     * @desc The thumbnail file. It is base 64 encoded octet stream with the file content.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'thumbnail', {
        get : function () {
            return this._thumbnail;
        },
        set : function (val) {
            this._thumbnail = val;
        }
    });

    /**
     * @instance
     * @name thumbnailMimeType
     * @desc MimeType of thumbnail
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'thumbnailMimeType', {
        get : function () {
            return this._thumbnailMimeType;
        },
        set : function (val) {
            this._thumbnailMimeType = val;
        }
    });

    /**
     * @instance
     * @name profile
     * @desc Profile description
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'profile', {
        get : function () {
            return this._profile;
        },
        set : function (val) {
            this._profile = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc Description of broadcast
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name public
     * @desc Means whether or not to show it in the portal. Applicable, only if user has access to this video.
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'public', {
        get : function () {
            return this._public;
        },
        set : function (val) {
            this._public = val;
        }
    });

    /**
     * @instance
     * @name questionsAndAnswersEnabled
     * @desc Is Q&A feature enabled
     * @type {string|boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'questionsAndAnswersEnabled', {
        get : function () {
            return this._questionsAndAnswersEnabled;
        },
        set : function (val) {
            this._questionsAndAnswersEnabled = val;
        }
    });

    /**
     * @instance
     * @name moderatorPIN
     * @desc PIN for moderator
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'moderatorPIN', {
        get : function () {
            return this._moderatorPIN;
        },
        set : function (val) {
            this._moderatorPIN = val;
        }
    });

    /**
     * @instance
     * @name programId
     * @desc This is the UUID. Portal should guarantee the unique at any time.
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'programId', {
        get : function () {
            return this._programId;
        },
        set : function (val) {
            this._programId = val;
        }
    });

    /**
     * @instance
     * @name accessModeSetting
     * @desc Container to store access related settings
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     */
    Object.defineProperty(BroadcastSetting.prototype, 'accessModeSetting', {
        get : function () {
            return this._accessModeSetting;
        },
        set : function (accessModeSetting) {
            this._accessModeSetting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting(accessModeSetting);
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting = BroadcastSetting;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc BroadcastProfile object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile
     * @param {Object|undefined} broadcastProfile
     */
    function BroadcastProfile(broadcastProfile) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof broadcastProfile !== 'undefined' && broadcastProfile !== null) {
            this._profilesId = broadcastProfile.profilesId || '';
            this._profilesName = broadcastProfile.profilesName || '';
        } else {
            this._profilesId = '';
            this._profilesName = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator();
    }

    BroadcastProfile.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name profilesId
     * @desc The ID of the profile as defined in Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile
     */
    Object.defineProperty(BroadcastProfile.prototype, 'profilesId', {
        get : function () {
            return this._profilesId;
        },
        set : function (val) {
            this._profilesId = val;
        }
    });

    /**
     * @instance
     * @name profileName
     * @desc The name of the profileas defined in Scopia® Management.
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile
     */
    Object.defineProperty(BroadcastProfile.prototype, 'profilesName', {
        get : function () {
            return this._profilesName;
        },
        set : function (val) {
            this._profilesName = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile = BroadcastProfile;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Access Mode Settings object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting
     * @param {Object|undefined} accessModeSetting
     */
    function AccessModeSetting(accessModeSetting) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof accessModeSetting !== 'undefined' && accessModeSetting !== null) {
            this._accessMode = accessModeSetting.accessMode || '';
            this._userIds = accessModeSetting.userIds || '';
        } else {
            this._accessMode = '';
            this._userIds = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator();
    }

    AccessModeSetting.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name accessMode
     * @desc Should be one of the following 
     * • PRIVATE
     * • LIMITED_USERS
     * • ALL_AUTHED_USERS
     * • ALL_USERS
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting
     */
    Object.defineProperty(AccessModeSetting.prototype, 'accessMode', {
        get : function () {
            return this._accessMode;
        },
        set : function (val) {
            this._accessMode = val;
        }
    });

    /**
     * @instance
     * @name userIds
     * @desc IDs of users, applicable only if accessMode is LIMITED_USERS
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting
     */
    Object.defineProperty(AccessModeSetting.prototype, 'userIds', {
        get : function () {
            return this._userIds;
        },
        set : function (val) {
            this._userIds = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting = AccessModeSetting;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Terminal object with resource availability data
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     * @param {Object|undefined} resourceAvailability
     */
    function ResourceAvailability(resourceAvailability) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof resourceAvailability !== 'undefined' && resourceAvailability !== null) {
            this._id = resourceAvailability.id || '';
            this._type = resourceAvailability.type || 'TERMINAL';
            this._availability = resourceAvailability.availability || [];
        } else {
            this._id = '';
            this._type = 'TERMINAL';
            this._availability = [];
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator();
    }

    ResourceAvailability.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc The internal terminal id
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     */
    Object.defineProperty(ResourceAvailability.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name type
     * @desc Terminal or User. Possible values are:
     * • TERMINAL
     * • CONTACT
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     */
    Object.defineProperty(ResourceAvailability.prototype, 'type', {
        get : function () {
            return this._type;
        },
        set : function (val) {
            this._type = val;
        }
    });

    /**
     * @instance
     * @name availability
     * @desc Container tag indicates all of the busy/free periods of the terminal or virtual MCU
     * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability[]}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     */
    Object.defineProperty(ResourceAvailability.prototype, 'availability', {
        get : function () {
            return this._availability;
        },
        set : function (availability) {
            this._availability = [];
            if (availability) {
                if (Array.isArray(availability)) {
                    for (var i = 0; i < availability.length; i++) {
                        this._availability.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability(availability[i]));
                    }
                } else {
                    this._availability.push(new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability(availability));
                }
            }
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability = ResourceAvailability;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Availability object class
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     * @param {Object|undefined} availability
     */
    function Availability(availability) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof availability !== 'undefined' && availability !== null) {
            this._fromTime = availability.fromTime || '';
            this._toTime = availability.toTime || '';
            this._status = availability.status || '';
        } else {
            this._fromTime = '';
            this._toTime = '';
            this._status = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator();
    }

    Availability.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name fromTime
     * @desc The start time of the busy/free time
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     */
    Object.defineProperty(Availability.prototype, 'fromTime', {
        get : function () {
            return this._fromTime;
        },
        set : function (val) {
            this._fromTime = val;
        }
    });

    /**
     * @instance
     * @name toTime
     * @desc The end time of the busy/free time
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     */
    Object.defineProperty(Availability.prototype, 'toTime', {
        get : function () {
            return this._toTime;
        },
        set : function (val) {
            this._toTime = val;
        }
    });

    /**
     * @instance
     * @name status
     * @desc BUSY or FREE
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability
     */
    Object.defineProperty(Availability.prototype, 'status', {
        get : function () {
            return this._status;
        },
        set : function (val) {
            this._status = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability = Availability;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Class that represents propositional fields
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService
     * @define AvayaMeetingManagementClient.MeetingManagementService.Propositional
     * @param {Object|undefined} propositional
     */
    function Propositional(propositional) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof propositional !== 'undefined' && propositional !== null) {
            this._number = propositional.number || '';
            this._virtualMeetingIDPrefix = propositional.virtualMeetingIDPrefix || '';
            this._minimumMeetingIDLength = propositional.minimumMeetingIDLength || '';
            this._defaultDuration = propositional.defaultDuration || '';
            this._defaultDialMode = propositional.defaultDialMode || '';
            this._termination = propositional.termination || '';
        } else {
            this._number = '';
            this._virtualMeetingIDPrefix = '';
            this._minimumMeetingIDLength = '';
            this._defaultDuration = '';
            this._defaultDialMode = '';
            this._termination = '';
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator();
    }

    Propositional.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name number
     * @desc The proposed number to be used during instant meeting schedulling
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    /**
     * @instance
     * @name virtualMeetingIDPrefix
     * @desc Proposed prefix for meeting
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'virtualMeetingIDPrefix', {
        get : function () {
            return this._virtualMeetingIDPrefix;
        },
        set : function (val) {
            this._virtualMeetingIDPrefix = val;
        }
    });

    /**
     * @instance
     * @name minimumMeetingIDLength
     * @desc Minimum length of meeting number
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'minimumMeetingIDLength', {
        get : function () {
            return this._minimumMeetingIDLength;
        },
        set : function (val) {
            this._minimumMeetingIDLength = val;
        }
    });

    /**
     * @instance
     * @name defaultDuration
     * @desc Default duration of meeting in minutes
     * @type {string|number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'defaultDuration', {
        get : function () {
            return this._defaultDuration;
        },
        set : function (val) {
            this._defaultDuration = val;
        }
    });

    /**
     * @instance
     * @name defaultDialMode
     * @desc Dialing mode. Possible values are:
     * • DIAL_OUT
     * • DIAL_IN
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'defaultDialMode', {
        get : function () {
            return this._defaultDialMode;
        },
        set : function (val) {
            this._defaultDialMode = val;
        }
    });

    /**
     * @instance
     * @name termination
     * @desc Termination type:
     * • SCHEDULE_END_TIME
     * • ALL_ENDPOINT_LEFT
     * @type {string}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'termination', {
        get : function () {
            return this._termination;
        },
        set : function (val) {
            this._termination = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Propositional = Propositional;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Customizable Video Layout for participant (Meeting Management API v.2)
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     * @param {Object|undefined} videoLayout
     */
    function VideoLayout(videoLayout) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof videoLayout !== 'undefined' && videoLayout !== null) {
            this._layoutName = videoLayout.layoutName || 'MAIN';
            this._layoutType = (videoLayout.layoutType && videoLayout.layoutType !== '0') ? videoLayout.layoutType : '0000';
            this._dynamic = (typeof videoLayout.dynamic === 'boolean') ? videoLayout.dynamic : false;
            this._noSelfSee = (typeof videoLayout.noSelfSee === 'boolean') ? videoLayout.noSelfSee : false;
            this._layoutMax = videoLayout.layoutMax || 0;
        } else {
            this._layoutName = 'MAIN';
            this._layoutType = '0000';
            this._dynamic = false;
            this._noSelfSee = false;
            this._layoutMax = 0;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.VideoLayoutValidator();
    }

    VideoLayout.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name layoutName
     * @desc Video Layout name (Main|Customer) (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutName', {
        get : function () {
            return this._layoutName;
        },
        set : function (val) {
            this._layoutName = val;
        }
    });

    /**
     * @instance
     * @name layoutType
     * @desc Video Layout type (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutType', {
        get : function () {
            return this._layoutType;
        },
        set : function (val) {
            this._layoutType = val;
        }
    });

    /**
     * @instance
     * @name dynamic
     * @desc This property is true if video layout is dynamic and you should not care about maximum participants count (Meeting Management API v.2)
     * @type {boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'dynamic', {
        get : function () {
            return this._dynamic;
        },
        set : function (val) {
            this._dynamic = val;
        }
    });

    /**
     * @instance
     * @name noSelfSee
     * @desc Is is true if you don't want to see yourself in meeting layout (Meeting Management API v.2)
     * @type {boolean}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'noSelfSee', {
        get : function () {
            return this._noSelfSee;
        },
        set : function (val) {
            this._noSelfSee = val;
        }
    });

    /**
     * @instance
     * @name layoutMax
     * @desc Maximum participants count for the layout (Meeting Management API v.2)
     * @type {number}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutMax', {
        get : function () {
            return this._layoutMax;
        },
        set : function (val) {
            this._layoutMax = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout = VideoLayout;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Party Layout(IN\OUT) for participant (Meeting Management API v.2)
     * Subclass of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object.
     * @private
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting
     * @define AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     * @param {Object|undefined} partyLayout
     */
    function PartyLayout(partyLayout) {

        AvayaMeetingManagementClient.Base.Providers.Dto.call(this);

        if (typeof partyLayout !== 'undefined' && partyLayout !== null) {
            this._layoutName = partyLayout.layoutName || 'MAIN';
            this._positionId = typeof(partyLayout.positionId) === 'number' && partyLayout.positionId >= 0 ? partyLayout.positionId : -1;
        } else {
            this._layoutName = 'MAIN';
            this._positionId = -1;
        }

        this._validator = new AvayaMeetingManagementClient.Providers.Validators.PartyLayoutValidator();
    }

    PartyLayout.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name layoutName
     * @desc Video Layout name (Main|Customer) (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     */
    Object.defineProperty(PartyLayout.prototype, 'layoutName', {
        get : function () {
            return this._layoutName;
        },
        set : function (val) {
            this._layoutName = val;
        }
    });

    /**
     * @instance
     * @name positionId
     * @desc Position Id for Layout (Meeting Management API v.2)
     * @type {AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE}
     * @memberOf AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout
     */
    Object.defineProperty(PartyLayout.prototype, 'positionId', {
        get : function () {
            return this._positionId;
        },
        set : function (val) {
            this._positionId = val;
        }
    });

    AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout = PartyLayout;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *
     * Response is returned by object validators
     * 
     * @class
     * @constructor
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.ObjectValidation
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

    AvayaMeetingManagementClient.Base.Responses.ObjectValidation = ObjectValidation;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *
     * Response is returned to query meeting request
     * 
     * @class
     * @constructor
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse
     * @param {string} returnValue - success or error condition
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting[]} meetings - list of meeting
     */
    function QueryMeetingResponse(returnValue, meetings) {

        /**
         *
         * Returns response code
         * 
         * @public
         * @type {OK|ConferenceNotFound|Error|FATAL}
         */
        this.returnValue = returnValue;

        /**
         *
         * Returns an array of Meetings in case of success
         *
         * @public
         * @type {AvayaMeetingManagementClient.MeetingManagementService.Meeting[]}
         */
        this.meetings = meetings;

        return this;
    }

    AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse = QueryMeetingResponse;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     *
     * Response is returned to query program request
     * 
     * @class
     * @constructor
     * @private
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse
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

    AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse = SimpleObjectResponse;
})(AvayaMeetingManagementClient);

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
(function (AvayaMeetingManagementClient) {
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
     * @memberOf AvayaMeetingManagementClient.Base.Responses
     * @define AvayaMeetingManagementClient.Base.Responses.Promise
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
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
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
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
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
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
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
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
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
         * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
         */
        then : function (doneCallback, failCallback, progressCallback) {}
    };

    AvayaMeetingManagementClient.Base.Responses.Promise = Promise;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Server data object to communicate with service
     * @public
     * @memberOf AvayaMeetingManagementClient.Config
     * @define AvayaMeetingManagementClient.Config.ClientConfig
     * @param {Object} config - data object with resources for service
     */
    function ClientConfig(config) {

        if (config) {
            /**
             * @public
             * @type {AvayaMeetingManagementClient.Config.Resources}
             * @desc resources for service
             */
            this.resources = new AvayaMeetingManagementClient.Config.Resources(config.resources);
        }
    }

    AvayaMeetingManagementClient.Config.ClientConfig = ClientConfig;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Meeting management resources paths
     * @public
     * @memberOf AvayaMeetingManagementClient.Config
     * @define AvayaMeetingManagementClient.Config.Resources
     * @param {Object} config - meeting management resources config
     */
    function Resources(config) {

        
    this.fetchMeetingServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING];
    this.getBroadcastProfilesServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE];
    this.getPropositionalNumberServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER];
    this.createMeetingUrlServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING];
    this.getResourceAvailabilityServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY];
    this.virtualRoomSearchServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM];
    this.deleteMeetingUrlServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING];
    this.updateMeetingUrlServerApiVersions = [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING];
    
    if (config && config.resources && config.resources.conference) {

            if (config.resources.conference.GET && config.resources.conference.GET.getConferences) {
                /**
                 * @public
                 * @type {string}
                 * @desc getConferences URL
                 */
                this.fetchMeetingUrl = config.resources.conference.GET.getConferences.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getConferences request 
                 */
                this.fetchMeetingServerApiVersions = config.resources.conference.GET.getConferences.responseTypes || this.fetchMeetingServerApiVersions;				
            }

            if (config.resources.conference.GET && config.resources.conference.GET.getBroadcastProfiles) {
                /**
                 * @public
                 * @type {string}
                 * @desc getBroadcastProfiles URL
                 */
                this.getBroadcastProfiles = config.resources.conference.GET.getBroadcastProfiles.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getBroadcastProfiles request 
                 */
                this.getBroadcastProfilesServerApiVersions = config.resources.conference.GET.getBroadcastProfiles.responseTypes || this.getBroadcastProfilesServerApiVersions;	
            }

            if (config.resources.conference.GET && config.resources.conference.GET.getPropositionalNumber) {
                /**
                 * @public
                 * @type {string}
                 * @desc getPropositionalNumber URL
                 */
                this.getPropositionalNumber = config.resources.conference.GET.getPropositionalNumber.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getPropositionalNumber request 
                 */
                this.getPropositionalNumberServerApiVersions = config.resources.conference.GET.getPropositionalNumber.responseTypes || this.getPropositionalNumberServerApiVersions;	
            }

            if (config.resources.conference.POST && config.resources.conference.POST.createConference) {
                /**
                 * @public
                 * @type {string}
                 * @desc createConference URL
                 */
                this.createMeetingUrl = config.resources.conference.POST.createConference.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for createConference request 
                 */
                this.createMeetingUrlServerApiVersions = config.resources.conference.POST.createConference.responseTypes || this.createMeetingUrlServerApiVersions;
            }

            if (config.resources.conference.POST && config.resources.conference.POST.getResourceAvailability) {
                /**
                 * @public
                 * @type {string}
                 * @desc get resource availability URL
                 */
                this.getResourceAvailability = config.resources.conference.POST.getResourceAvailability.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getResourceAvailability request 
                 */
                this.getResourceAvailabilityServerApiVersions = config.resources.conference.POST.getResourceAvailability.responseTypes || this.getResourceAvailabilityServerApiVersions;
            }

            if (config.resources.conference.POST && config.resources.conference.POST.getVirtualRoom) {
                /**
                 * @public
                 * @type {string}
                 * @desc get virtual room URL
                 */
                this.virtualRoomSearch = config.resources.conference.POST.getVirtualRoom.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for getVirtualRoom request 
                 */
                this.virtualRoomSearchServerApiVersions = config.resources.conference.POST.getVirtualRoom.responseTypes || this.virtualRoomSearchServerApiVersions;
            }

            if (config.resources.conference.DELETE && config.resources.conference.DELETE.deleteConference) {
                /**
                 * @public
                 * @type {string}
                 * @desc deleteConference URL
                 */
                this.deleteMeetingUrl = config.resources.conference.DELETE.deleteConference.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for deleteConference request 
                 */
                this.deleteMeetingUrlServerApiVersions = config.resources.conference.DELETE.deleteConference.responseTypes || this.deleteMeetingUrlServerApiVersions;
            }

            if (config.resources.conference.PUT && config.resources.conference.PUT.updateConference) {
                /**
                 * @public
                 * @type {string}
                 * @desc updateConference URL
                 */
                this.updateMeetingUrl = config.resources.conference.PUT.updateConference.href || '';
                /**
                 * @public
                 * @type {string[]}
                 * @desc Supported by Server API versions array for updateConference request 
                 */
                this.updateMeetingUrlServerApiVersions = config.resources.conference.PUT.updateConference.responseTypes || this.updateMeetingUrlServerApiVersions;
            }
        }

        this.fetchMeetingUrl = this.fetchMeetingUrl || '';
        this.createMeetingUrl = this.createMeetingUrl || '';
        this.deleteMeetingUrl = this.deleteMeetingUrl || '';
        this.updateMeetingUrl = this.updateMeetingUrl || '';
        this.getBroadcastProfiles = this.getBroadcastProfiles || '';
        this.getPropositionalNumber = this.getPropositionalNumber || '';
        this.getResourceAvailability = this.getResourceAvailability || '';
        this.virtualRoomSearch = this.virtualRoomSearch || '';
    }

    AvayaMeetingManagementClient.Config.Resources = Resources;
})(AvayaMeetingManagementClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * AvayaMeetingManagementClient.Base.Logger
     * This class do nothing and represented only for documentation purposes
     * By default Service use window.console logger
     * If specific Logger object is needed it should be implemented in scope of
     * {@link AvayaMeetingManagementClient.Config} and should be passed to
     * {Avaya Meeting Management Client} constructor directly
     * @class
     * @constructor
     * @public
     * @memberOf AvayaMeetingManagementClient.Config
     * @define AvayaMeetingManagementClient.Config.Logger
     */
    function Logger() {}

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#log
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console
     * @public
     * @abstract
     */
    Logger.prototype.log = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#info
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'info' label
     * @public
     * @abstract
     */
    Logger.prototype.info = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#warn
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'warn' label
     * @public
     * @abstract
     */
    Logger.prototype.warn = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#error
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'error' label
     * @public
     * @abstract
     */
    Logger.prototype.error = function () {};

    /**
     * @function AvayaMeetingManagementClient.Config.Logger#debug
     * @memberOf AvayaMeetingManagementClient.Config.Logger
     * @desc Logs data to console with 'debug' label
     * @public
     * @abstract
     */
    Logger.prototype.debug = function () {};

    AvayaMeetingManagementClient.Config.Logger = Logger;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for UPS Portal server
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers
     * @define AvayaMeetingManagementClient.Providers.PortalProvider
     */
    function PortalProvider() {
        AvayaMeetingManagementClient.Base.Providers.RequestBuilder.call(this);

        this._name = 'AvayaMeetingManagementClient.Providers.PortalProvider';
    }

    PortalProvider.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#scheduleMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Schedule a new meeting
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.scheduleMeeting = function (opts) {
        ammcLogger.debug(this._name + '#scheduleMeeting: %o', opts);

        opts.data = this.convertMeetingToServerObject(opts.data.meeting);
        var usedApiVersion = (this.checkVersion(this.resources.createMeetingUrlServerApiVersions) === 2) ? AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETINGv2 : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING;

        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETINGv2, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : usedApiVersion
        };
        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('OK', response.status);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#scheduleMeeting::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('FAIL', response.status);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#changeMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Update an existing meeting
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.changeMeeting = function (opts) {
        ammcLogger.debug(this._name + '#changeMeeting: %o', opts);

        opts.data = this.convertMeetingToServerObject(opts.data.meeting);
        var usedApiVersion = (this.checkVersion(this.resources.updateMeetingUrlServerApiVersions) === 2) ? AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETINGv2 : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING;

        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETINGv2,  AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : usedApiVersion
        };
        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('OK', response.status);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#changeMeeting::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('FAIL', response.status);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#deleteMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Delete an existing meeting
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.deleteMeeting = function (opts) {
        ammcLogger.debug(this._name + '#deleteMeeting: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse(response.ReturnValue, response.status);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#deleteMeeting::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse(response.ReturnValue, response.status);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getMeetingListByCriteria
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get list of {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} by provided criterias. Response {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {string} params - params for url string
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getMeetingListByCriteria = function (params) {
        ammcLogger.debug(this._name + '#getMeetingListByCriteria: %o', params);

        var opts = {},
        self = this,
        res;

        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETINGv2, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR]
        };
        opts.url = this.resources.fetchMeetingUrl + '?' + params;
        opts.method = 'GET';

        var serverRequest = this.send(opts);

        var convertResponseToObject = serverRequest.then(function (response) {
                var meetings = self.convertMeetingArrayResponseToSdkArrayObject(response.conferences);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('OK', meetings);

                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getMeetingListByCriteria::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getBroadcastProfilesFromServer
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get array of: {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile}
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getBroadcastProfilesFromServer = function (opts) {
        ammcLogger.debug(this._name + '#getBroadcastProfilesFromServer: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var profiles = response.broadcastProfiles.map(function (profile) {
                        return new AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile(profile);
                    });

                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', profiles);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getBroadcastProfilesFromServer::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getPropositionalDataFromServer
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get propositional data generated for meetings out of VRs
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getPropositionalDataFromServer = function (opts) {
        ammcLogger.debug(this._name + '#getPropositionalDataFromServer: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var propositional = new AvayaMeetingManagementClient.MeetingManagementService.Propositional(response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', propositional);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getPropositionalDataFromServer::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#getEndpointResourceAvailabilityFromServer
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Get resource availability for endpoints for a day
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getEndpointResourceAvailabilityFromServer = function (opts) {
        ammcLogger.debug(this._name + '#getEndpointResourceAvailabilityFromServer: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var availabilities = response.resourceAvailability.map(function (resourceAvailability) {
                        return new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability(resourceAvailability);
                    });

                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', availabilities);
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#getEndpointResourceAvailabilityFromServer::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#virtualRoomSearchRequest
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Search virtual rooms by part of user name and tenant id
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.virtualRoomSearchRequest = function (opts) {
        ammcLogger.debug(this._name + '#virtualRoomSearchRequest: %o', opts);

        var serverRequest = this.send(opts),
        self = this,
        res;

        var convertResponseToObject = serverRequest.then(function (response) {
                var rooms = response.virtualRoom.map(function (room) {
                        return new AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom(room);
                    });

                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('OK', {
                        records : response.records,
                        virtualRoom : rooms,
                        totalCount : response.totalCount
                    });
                return $.Deferred().resolve(res).promise();
            }).fail(function (response) {
                ammcLogger.warn(self._name + '#virtualRoomSearchRequest::serverRequest fail', response);
                res = new AvayaMeetingManagementClient.Base.Responses.SimpleObjectResponse('FAIL', response);
                return $.Deferred().reject(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#convertMeetingToServerObject
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Convert object to server format
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting - SDK object
     * @returns {Object}
     */
    PortalProvider.prototype.convertMeetingToServerObject = function (meeting) {
        // Delete objects if there fields are empty. Server requirement.
        if (meeting.daily && meeting.daily.numberOfEveryDay === '' && !meeting.daily.everyWeekDay) {
            delete meeting._daily;
        }
        if (meeting.weekly && meeting.weekly.numberOfEveryWeek === '' && meeting.weekly.daysOfWeek.length === 0) {
            delete meeting._weekly;
        }
        if (meeting.monthly && meeting.monthly.dayOfNumberOfEveryMonth.weekOfMonth === '' && meeting.monthly.dayOfNumberOfEveryMonth.dayOfWeek.length === 0) {
            delete meeting.monthly._dayOfNumberOfEveryMonth;
        }
        if (meeting.monthly && meeting.monthly.numberOfEveryMonth === '' && meeting.monthly.dayOfMonth === '' && !meeting.monthly.dayOfNumberOfEveryMonth) {
            delete meeting._monthly;
        }
        if (meeting.recurrenceEnd && meeting.recurrenceEnd.endOfOccurrences === '' && meeting.recurrenceEnd.by === '') {
            delete meeting._recurrenceEnd;
        }
        if (meeting.broadcastSetting && meeting.broadcastSetting.programId === '' && meeting.broadcastSetting.profile === '' && meeting.broadcastSetting.subject === '') {
            delete meeting._broadcastSetting;
        }

        // Strange legacy iView behavior: if dialIn is TRUE then call to the endpoint is not performed
        // since that's incorrect logic from end-user's perspective adding a value reverting to Portal provider only
        // See details in UPS-691
        for (var k = 0; k < meeting._attendees.length; k++) {
            meeting._attendees[k]._autoDialIn = !meeting._attendees[k]._autoDialIn;
        }

            // API versioning conversion
        // Meeting object is used for Schedule and Update operations, check only one type as they are always have same version
        var highestSupportedVersion = 1;
        if (this.resources.createMeetingUrlServerApiVersions) {
            highestSupportedVersion = this.checkVersion(this.resources.createMeetingUrlServerApiVersions);
        }

        switch (highestSupportedVersion) {
        case 1:
            this.fallbackToV1(meeting);
            break;
        case 2:
            for (var i = 0; i < meeting._attendees.length; i++) {
                delete meeting._attendees[i]._partyOutLayout._positionId;
            }
            break;
        default:
            this.fallbackToV1(meeting);
        }
        var serverObject = {
            conference : [meeting]
        };

        //Remove empty fields and object validators from request string
        serverObject = JSON.stringify(serverObject).replace(/"_([0-9a-zA-Z-_]+)"/g, '"$1"').replace(/"validator":\{\},/g, '').replace(/("[^"]+":""[,]*)|[,]*"[^"]+":""/g, '');

        return serverObject;
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#checkVersion
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Returns highest supported version
     * @private
     * @param [] supportedVersionsArray
     * @returns {number}
     */
    PortalProvider.prototype.checkVersion = function (supportedVersionsArray) {
        if(!supportedVersionsArray || !Array.isArray(supportedVersionsArray)){
            return 1;
        }

        var str = supportedVersionsArray.join('');
        var res = str.match(/^.*(v2\+json).*$/);
        if (res) {
            return 2;
        } else {
            return 1;
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#fallbackToV1
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Removes added in V2 API fields
     * @private
     * @param {Object} meeting
     * @returns {AvayaMeetingManagementClient.MeetingManagementService.Meeting}
     */
    PortalProvider.prototype.fallbackToV1 = function (meeting) {
        delete meeting._eventConference;
        delete meeting._panelistNumber;
        delete meeting._mainVideoLayout;
        delete meeting._customerVideoLayout;
        delete meeting._participantLaunchURL;
        delete meeting._swcLaunchURLforModerator;
        for (var i = 0; i < meeting._attendees.length; i++) {
            delete meeting._attendees[i]._mainPartyInLayout;
            delete meeting._attendees[i]._customerPartyInLayout;
            delete meeting._attendees[i]._partyOutLayout;
            delete meeting._attendees[i]._panelist;
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#convertMeetingToSdkObject
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} meeting - JSON object from server
     * @returns {AvayaMeetingManagementClient.MeetingManagementService.Meeting}
     */
    PortalProvider.prototype.convertMeetingToSdkObject = function (meeting) {
        // XML lib returns object with all keys started with uppercase, switch to lower.
        /*meeting = JSON.stringify(meeting).replace(/"(\w+)"/g, function (x, y) {
        return '"' + y.charAt(0).toLowerCase() + y.slice(1) + '"';
        });*/

        // Strange legacy iView behavior: if dialIn is TRUE then call to the endpoint is not performed
        // since that's incorrect logic from end-user's perspective adding a value reverting to Portal provider only
        // See details in UPS-691
        if (meeting.attendees && Array.isArray(meeting.attendees)) {
            for (var k = 0; k < meeting.attendees.length; k++) {
                meeting.attendees[k].autoDialIn = !meeting.attendees[k].autoDialIn;
            }
        }
        var sdkObj = new AvayaMeetingManagementClient.MeetingManagementService.Meeting(meeting);

        return sdkObj;
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.PortalProvider#convertMeetingArrayResponseToSdkArrayObject
     * @memberOf AvayaMeetingManagementClient.Providers.PortalProvider
     * @desc Re-form array object to SDK format
     * @private
     * @param {Object[]} meetings
     * @returns {AvayaMeetingManagementClient.MeetingManagementService.Meeting[]}
     */

    PortalProvider.prototype.convertMeetingArrayResponseToSdkArrayObject = function (meetings) {
        ammcLogger.log(this._name + '#convertMeetingArrayResponseToSdkArrayObject: %o', meetings);

        var self = this;

        return meetings.map(function (meeting) {
            return self.convertMeetingToSdkObject(meeting);
        });
    };

    AvayaMeetingManagementClient.Providers.PortalProvider = PortalProvider;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Providers.PortalProvider
     * @classdesc SDK API layer. Main implementation class for Meeting Management Service
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers
     * @define AvayaMeetingManagementClient.Providers.MeetingProvider
     */
    function MeetingProvider() {

        AvayaMeetingManagementClient.Providers.PortalProvider.call(this);

        this._name = 'AvayaMeetingManagementClient.Providers.MeetingProvider';

        /**
         * @private
         * @type {AvayaMeetingManagementClient.Providers.Validators}
         * @desc Assign additional custom Validator to Provider
         */
        this._validator = new AvayaMeetingManagementClient.Providers.Validators.PlainValidator();
    }

    MeetingProvider.prototype = Object.create(AvayaMeetingManagementClient.Providers.PortalProvider.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#createMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Schedule a new Meeting
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.createMeeting = function (meeting) {
        ammcLogger.debug(this._name + '#createMeeting: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.createMeetingUrl;
            opts.method = 'POST';
            return this.scheduleMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#createMeeting', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#updateMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Update existing Meeting created by User
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.updateMeeting = function (meeting) {
        ammcLogger.debug(this._name + '#updateMeeting: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.updateMeetingUrl + '/' + meeting.conferenceId;
            opts.method = 'PUT';
            return this.changeMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#updateMeeting', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#updateOccurrence
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Update existing occurrence in meeting series
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.updateOccurrence = function (meeting) {
        ammcLogger.debug(this._name + '#updateOccurrence: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            if (meeting.daily) { delete meeting._daily; }
            if (meeting.weekly) { delete meeting._weekly; }
            if (meeting.monthly) { delete meeting._monthly; }

            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.updateMeetingUrl + '/' + meeting.conferenceId;
            opts.method = 'PUT';
            opts.headers = {
                'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
                'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING
            };
            return this.changeMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#updateOccurrence', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#updateSeries
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Update existing meeting series
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.updateSeries = function (meeting) {
        ammcLogger.debug(this._name + '#updateSeries: %o', meeting);
        var opts = {},
        validateResponse = meeting.validate();

        if (validateResponse.success) {
            meeting.conferenceId = meeting.recurrenceId;

            opts.data = {
                meeting : meeting
            };
            opts.url = this.resources.updateMeetingUrl + '/' + meeting.recurrenceId;
            opts.method = 'PUT';
            opts.headers = {
                'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
                'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING
            };
            return this.changeMeeting(opts);
        } else {
            return this._validator.errorInvalidObject(this._name + '#updateSeries', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#cancelMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Cancel existing Meeting
     * @private
     * @param {string} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.cancelMeeting = function (meetingId) {
        ammcLogger.debug(this._name + '#cancelMeeting: %s', meetingId);
        var opts = {};

        opts.data = {
            ConferenceId : meetingId
        };
        opts.url = this.resources.deleteMeetingUrl + '/' + meetingId;
        opts.method = 'DELETE';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
        };
        return this.deleteMeeting(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#terminateMeeting
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Terminate existing Meeting
     * @private
     * @param {string} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.terminateMeeting = function (meetingId) {
        ammcLogger.debug(this._name + '#terminateMeeting: %s', meetingId);
        var opts = {};

        opts.data = {
            ConferenceId : meetingId
        };
        opts.url = this.resources.deleteMeetingUrl + '/' + meetingId + '/terminate';
        opts.method = 'DELETE';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING
        };
        return this.deleteMeeting(opts);
    };

        /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#cancelOccurrence
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Cancel existing occurrence in meeting series
     * @private
     * @param {string} recurrenceId
     * @param {Date|number} occurrenceStartTime
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.cancelOccurrence = function (recurrenceId, occurrenceStartTime) {
        ammcLogger.debug(this._name + '#cancelOccurrence: %s, %s', recurrenceId, occurrenceStartTime);
        var opts = {},
            startTime;

        try {
            startTime = occurrenceStartTime.toISOString();
        } catch (e) {
            startTime = new Date(occurrenceStartTime).toISOString();
        }

        if (!startTime) {
            return this._validator.errorInvalidObject(this._name + '#cancelOccurrence', "Invalid date format");
        } else {
            opts.url = this.resources.deleteMeetingUrl + '/' + recurrenceId + '?' + $.param({"startTime" : startTime});
            opts.method = 'DELETE';
            opts.headers = {
                'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
                'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
            };
            return this.deleteMeeting(opts);
        }
    };

        /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#cancelSeries
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Cancel existing meeting series
     * @private
     * @param {string} recurrenceId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.cancelSeries = function (recurrenceId) {
        ammcLogger.debug(this._name + '#cancelSeries: %s', recurrenceId);
        var opts = {};

        opts.data = {
            ConferenceId : recurrenceId
        };
        opts.url = this.resources.deleteMeetingUrl + '/' + recurrenceId;
        opts.method = 'DELETE';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
        };
        return this.deleteMeeting(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchMeetings
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search meetings by subject and description (contains logic) and by conference number and conference id (exact match)
     * @private
     * @param {string} searchQuery
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchMeetings = function (searchQuery, offset, count) {
        ammcLogger.debug(this._name + '#searchMeetings: %s', searchQuery);

        return this.getMeetingListByCriteria('textToSearch=' + searchQuery  + '&offset=' + offset + '&count=' + count);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingById
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get Meeting details by Id: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {string} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingById = function (meetingId) {
        ammcLogger.debug(this._name + '#getMeetingById: %s', meetingId);

        return this.getMeetingListByCriteria('conferenceId=' + meetingId);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListByDate
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects by provided Date: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {Date} date
     * @param {boolean} fetchPastMeetings
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListByDate = function (date, fetchPastMeetings, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListByDate: %s, %s, detailed: %s', date, fetchPastMeetings, detailed);
        var startTime,
        detailedParam = (detailed === false) ? '&detailed=false' : '',
        fetchPastMeetingsParam = (fetchPastMeetings === true ? '&status=FINISHED' : '');

        try {
            startTime = date.toISOString();
        } catch (e) {
            startTime = new Date(date).toISOString();
        }

        if (!startTime) {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListByDate', "Invalid date format");
        } else {
            var endTime = new Date(new Date(startTime).getTime() + 86399000).toISOString();
            return this.getMeetingListByCriteria('startTime=' + startTime + '&endTime=' + endTime + fetchPastMeetingsParam + detailedParam);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListByPeriod
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects by provided Period: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {boolean} fetchPastMeetings
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListByPeriod = function (startDate, endDate, fetchPastMeetings, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListByPeriod: %s, %s, %s, detailed: %s', startDate, endDate, fetchPastMeetings, detailed);

        var start,
        detailedParam = (detailed === false) ? '&detailed=false' : '',
        fetchPastMeetingsParam = (fetchPastMeetings === true ? '&status=FINISHED' : ''),
        end;

        try {
            start = startDate.toISOString();
        } catch (e) {
            start = new Date(startDate).toISOString();
        }

        try {
            end = endDate.toISOString();
        } catch (e) {
            end = new Date(endDate).toISOString();
        }

        if (!start || !end) {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListByPeriod', "Invalid date format");
        } else {
            return this.getMeetingListByCriteria('startTime=' + start + '&endTime=' + end + fetchPastMeetingsParam + detailedParam);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListIsOngoing
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of ongoing Meeting objects: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListIsOngoing = function (detailed) {
        ammcLogger.debug(this._name + '#getMeetingListIsOngoing: detailed: %s', detailed);
        var detailedParam = (detailed === false) ? '&detailed=false' : '';

        return this.getMeetingListByCriteria('status=IN_SESSION' + detailedParam);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListByStatus
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects by status: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {string} status
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListByStatus = function (status, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListByStatus: %s, detailed: %s', status, detailed);

        var validateResponse = this._validator.validateMeetingStatus(status),
        detailedParam = (detailed === false) ? '&detailed=false' : '';

        if (validateResponse.success) {
            return this.getMeetingListByCriteria('status=' + status + detailedParam);
        } else {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListByStatus', validateResponse);
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getMeetingListStartsIn
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of Meeting objects which start by provided minutes: {@link AvayaMeetingManagementClient.Base.Responses.QueryMeetingResponse}
     * @private
     * @param {number} minutes
     * @param {boolean} detailed
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getMeetingListStartsIn = function (minutes, detailed) {
        ammcLogger.debug(this._name + '#getMeetingListStartsIn: %s, detailed: %s', minutes, detailed);

        var detailedParam = (detailed === false) ? '&detailed=false' : '';

        if (this._validator.isNumberType(minutes)) {
            var startTime = new Date().toISOString();
            var endTime = new Date(Date.now() + minutes * 60000).toISOString();
            return this.getMeetingListByCriteria('startTime=' + startTime + '&endTime=' + endTime + detailedParam);
        } else {
            return this._validator.errorInvalidObject(this._name + '#getMeetingListStartsIn', "Invalid minutes format, it isn't a number");
        }
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getBroadcastProfiles
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of: {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile}
     * @private
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getBroadcastProfiles = function () {
        ammcLogger.debug(this._name + '#getBroadcastProfiles:');
        var opts = {};

        opts.url = this.resources.getBroadcastProfiles;
        opts.method = 'GET';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE
        };
        return this.getBroadcastProfilesFromServer(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getEndpointResourceAvailability
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get resource availability for endpoints for a day
     * @private
     * @param {number} startTime
     * @param {string[]} terminalIds
     * @param {number} meetingId
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getEndpointResourceAvailability = function (startTime, terminalIds, meetingId) {
        ammcLogger.debug(this._name + '#getEndpointResourceAvailability: %d, %o', startTime, terminalIds, meetingId);
        var opts = {},
        terminals = terminalIds.map(function (id) {
                return {
                    terminalId : id
                };
            });

        opts.data = JSON.stringify({
                conferenceId: meetingId,
                startTime : startTime,
                endTime : startTime + 86399000,
                attendees : terminals
            });

        opts.url = this.resources.getResourceAvailability;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY
        };
        return this.getEndpointResourceAvailabilityFromServer(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchVirtualRoomsByName
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search virtual rooms by part of VR name in specified tenant id
     * @private
     * @param {number} tenantId
     * @param {string} partOfVRName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchVirtualRoomsByName = function (tenantId, partOfVRName, offset, pageSize) {
        ammcLogger.debug(this._name + '#searchVirtualRoomsByName: %s, %s, %d, %d', tenantId, partOfVRName, offset, pageSize);
        var opts = {},
        req_offset = offset || 1,
        req_pageSize = pageSize || 10;

        opts.data = JSON.stringify({
                memberId : tenantId,
                virtualRoomName: partOfVRName,
                offset : req_offset,
                pageSize : req_pageSize
            });

        opts.url = this.resources.virtualRoomSearch;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
        };
        return this.virtualRoomSearchRequest(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchVirtualRoomsByNumber
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search virtual rooms by VR number in specified tenant id
     * @private
     * @param {number} tenantId
     * @param {string} number
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchVirtualRoomsByNumber = function (tenantId, number, offset, pageSize) {
        ammcLogger.debug(this._name + '#searchVirtualRoomsByNumber: %s, %s, %d, %d', tenantId, number, offset, pageSize);
        var opts = {},
        req_offset = offset || 1,
        req_pageSize = pageSize || 10;

        opts.data = JSON.stringify({
                memberId : tenantId,
                dialableNumber: number,
                offset : req_offset,
                pageSize : req_pageSize
            });

        opts.url = this.resources.virtualRoomSearch;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
        };
        return this.virtualRoomSearchRequest(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#searchVirtualRoomsByUserName
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Search virtual rooms by part of user name in specified tenant id
     * @private
     * @param {number} tenantId
     * @param {string} partOfUserName
     * @param {number} offset
     * @param {number} pageSize
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.searchVirtualRoomsByUserName = function (tenantId, partOfUserName, offset, pageSize) {
        ammcLogger.debug(this._name + '#searchVirtualRoomsByUserName: %s, %s, %d, %d', tenantId, partOfUserName, offset, pageSize);
        var opts = {},
        req_offset = offset || 1,
        req_pageSize = pageSize || 10;

        opts.data = JSON.stringify({
                memberId : tenantId,
                partOfUserName : partOfUserName,
                offset : req_offset,
                pageSize : req_pageSize
            });

        opts.url = this.resources.virtualRoomSearch;
        opts.method = 'POST';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM, AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR],
            'Content-Type' : AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
        };
        return this.virtualRoomSearchRequest(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getPropositionalData
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get propositional data generated for meetings out of VRs
     * @private
     * @returns {AvayaMeetingManagementClient.Base.Responses.Promise}
     */
    MeetingProvider.prototype.getPropositionalData = function () {
        ammcLogger.debug(this._name + '#getPropositionalData:');
        var opts = {};

        opts.url = this.resources.getPropositionalNumber;
        opts.method = 'GET';
        opts.headers = {
            'Accept' : [AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER,
            AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR]
        };
        return this.getPropositionalDataFromServer(opts);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.MeetingProvider#getVideoLayoutsArray
     * @memberOf AvayaMeetingManagementClient.Providers.MeetingProvider
     * @desc Get array of available video layouts
     * @private
     * @returns {Object[]}
     */
    MeetingProvider.prototype.getVideoLayoutsArray = function () {
        ammcLogger.debug(this._name + '#getVideoLayoutsArray:');
        return AvayaMeetingManagementClient.Constants.LAYOUTS;
    };

    AvayaMeetingManagementClient.Providers.MeetingProvider = MeetingProvider;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     */
    function MeetingValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    MeetingValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Meeting object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting} meeting
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    MeetingValidator.prototype.validateObject = function (meeting) {
        var errors = [];

        if (!this.validate(meeting.memberId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('memberId');
        }
        if (!this.validate(meeting.userId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }
        if (!this.validate(meeting.number, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('number');
        }
        if (!this.validate(meeting.accessPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('accessPIN');
        }
        if (!this.validate(meeting.moderatorPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('moderatorPIN');
        }
        if (!this.validate(meeting.serviceTemplateId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('serviceTemplateId');
        }
        if (!this.validate(meeting.servicePrefix, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('servicePrefix');
        }
        if (!this.validate(meeting.priority, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY)) {
            errors.push('priority');
        }
        if (!this.validate(meeting.allowStreaming, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowStreaming');
        }
        if (!this.validate(meeting.streamingStatus, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('streamingStatus');
        }

        var attendees = meeting.attendees;
        if (!Array.isArray(attendees)) {
            errors.push('attendees: is not an array');
        } else {
            for (var i = 0; i < attendees.length; i++) {
                var res = attendees[i].validate();
                if (!res.success) {
                    errors.push('attendees[' + i + ']:' + res.errors);
                }
            }
        }

        var reservedPortsRes = meeting.reservedPorts.validate();
        if (!reservedPortsRes.success) {
            errors.push(reservedPortsRes.errors);
        }

        if (!this.validate(meeting.blockDialIn, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('blockDialIn');
        }
        if (!this.validate(meeting.autoExtend, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoExtend');
        }
        if (!this.validate(meeting.waitingRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('waitingRoom');
        }

        var advancedPropertiesRes = meeting.advancedProperties.validate();
        if (!advancedPropertiesRes.success) {
            errors.push(advancedPropertiesRes.errors);
        }

        if (!this.validate(meeting.oneTimePINRequired, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('oneTimePINRequired');
        }
        if (!this.validate(meeting.conferenceId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('conferenceId');
        }
        if (!this.validate(meeting.status, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS)) {
            errors.push('status');
        }
        if (!this.validate(meeting.subject, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING, true)) {
            errors.push('subject');
        }
        if (!this.validate(meeting.description, AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT)) {
            errors.push('description');
        }

        try {
            new Date(meeting.earlyTime);
        } catch (e) {
            errors.push('earlyTime');
        }
        try {
            new Date(meeting.startTime);
        } catch (e) {
            errors.push('startTime');
        }
        try {
            new Date(meeting.plannedEndTime);
        } catch (e) {
            errors.push('plannedEndTime');
        }

        if (!this.validate(meeting.timeZoneId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('timeZoneId');
        }
        if (!this.validate(meeting.duration, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION, true)) {
            errors.push('duration');
        }
        if (!this.validate(meeting.locationId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('locationId');
        }
        if (!this.validate(meeting.testOnly, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('testOnly');
        }
        if (!this.validate(meeting.sendingNotification, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('sendingNotification');
        }
        if (!this.validate(meeting.recordingMeetingWhenStart, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('recordingMeetingWhenStart');
        }
        if (!this.validate(meeting.recurrenceId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('recurrenceId');
        }
        if (!this.validate(meeting.eventConference, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('eventConference');
        }
        if (!this.validate(meeting.panelistNumber, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            if (meeting.panelistNumber !== undefined){
                errors.push('panelistNumber');
            }
        }
        if (!this.validate(meeting.participantLaunchURL, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('participantLaunchURL');
        }
        if (!this.validate(meeting.swcLaunchURLforModerator, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('swcLaunchURLforModerator');
        }

        var dailyRes = meeting.daily.validate();
        if (!dailyRes.success) {
            errors.push(dailyRes.errors);
        }

        var weeklyRes = meeting.weekly.validate();
        if (!weeklyRes.success) {
            errors.push(weeklyRes.errors);
        }

        var monthlyRes = meeting.monthly.validate();
        if (!monthlyRes.success) {
            errors.push(monthlyRes.errors);
        }

        var recurrenceRes = meeting.recurrenceEnd.validate();
        if (!recurrenceRes.success) {
            errors.push(recurrenceRes.errors);
        }

        var broadcastSettingRes = meeting.broadcastSetting.validate();
        if (!broadcastSettingRes.success) {
            errors.push(broadcastSettingRes.errors);
        }

        var mainVideoLayoutRes = meeting.mainVideoLayout.validate();
        if (!mainVideoLayoutRes.success) {
            errors.push(mainVideoLayoutRes.errors);
        }

        var customerVideoLayoutRes = meeting.customerVideoLayout.validate();
        if (!customerVideoLayoutRes.success) {
            errors.push(customerVideoLayoutRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.MeetingValidator = MeetingValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator
     */
    function VirtualRoomValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    VirtualRoomValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator
     * @desc Validate VirtualRoom object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.VirtualRoom} virtualRoom
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    VirtualRoomValidator.prototype.validateObject = function (virtualRoom) {
        var errors = [];

        if (!this.validate(virtualRoom.memberId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('memberId');
        }
        if (!this.validate(virtualRoom.virtualRoomId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('virtualRoomId');
        }
        if (!this.validate(virtualRoom.number, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER, true)) {
            errors.push('number');
        }
        if (!this.validate(virtualRoom.accessPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('accessPIN');
        }
        if (!this.validate(virtualRoom.moderatorPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64)) {
            errors.push('moderatorPIN');
        }
        if (!this.validate(virtualRoom.serviceTemplateId, AvayaMeetingManagementClient.Constants.CONDITIONS.ID)) {
            errors.push('serviceTemplateId');
        }
        if (!this.validate(virtualRoom.servicePrefix, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('servicePrefix');
        }
        if (!this.validate(virtualRoom.priority, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY)) {
            errors.push('priority');
        }
        if (!this.validate(virtualRoom.allowStreaming, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowStreaming');
        }
        if (!this.validate(virtualRoom.allowRecording, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowRecording');
        }

        if (!this.validate(virtualRoom.streamingStatus, AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('streamingStatus');
        }

        var attendees = virtualRoom.attendees;
        if (!Array.isArray(attendees)) {
            errors.push('attendees: is not an array');
        } else {
            for (var i = 0; i < attendees.length; i++) {
                var res = attendees[i].validate();
                if (!res.success) {
                    errors.push('attendees[' + i + ']:' + res.errors);
                }
            }
        }

        var reservedPortsRes = virtualRoom.reservedPorts.validate();
        if (!reservedPortsRes.success) {
            errors.push(reservedPortsRes.errors);
        }

        if (!this.validate(virtualRoom.blockDialIn, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('blockDialIn');
        }
        if (!this.validate(virtualRoom.autoExtend, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoExtend');
        }
        if (!this.validate(virtualRoom.waitingRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('waitingRoom');
        }

        var advancedPropertiesRes = virtualRoom.advancedProperties.validate();
        if (!advancedPropertiesRes.success) {
            errors.push(advancedPropertiesRes.errors);
        }

        if (!this.validate(virtualRoom.oneTimePINRequired, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('oneTimePINRequired');
        }
        if (!this.validate(virtualRoom.name, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(virtualRoom.defaultRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('defaultRoom');
        }
        if (!this.validate(virtualRoom.publicRoom, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('publicRoom');
        }
        if (!this.validate(virtualRoom.maxParticipants, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxParticipants');
        }
        if (!this.validate(virtualRoom.allowKnocking, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowKnocking');
        }
        if (!this.validate(virtualRoom.allowInstantMeeting, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowInstantMeeting');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.VirtualRoomValidator = VirtualRoomValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Attendee} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AttendeeValidator
     */
    function AttendeeValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AttendeeValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Attendee object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Attendee} attendee
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AttendeeValidator.prototype.validateObject = function (attendee) {
        var errors = [];

        if (!this.validate(attendee.terminalId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING, false)) {
            errors.push('terminalId');
        }
        //Should be AvayaMeetingManagementClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL
        if (!this.validate(attendee.protocol, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('protocol');
        }
        if (!this.validate(attendee.terminalName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('terminalName');
        }
        if (!this.validate(attendee.terminalNumber, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('terminalNumber');
        }
        if (!this.validate(attendee.maxBandwidth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxBandwidth');
        }
        if (!this.validate(attendee.maxISDNBandwidth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxISDNBandwidth');
        }
        if (!this.validate(attendee.areaCode, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('areaCode');
        }
        if (!this.validate(attendee.countryCode, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('countryCode');
        }
        if (!this.validate(attendee.telephoneNumber, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('telephoneNumber');
        }
        if (!this.validate(attendee.restrictedMode, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('restrictedMode');
        }
        if (!this.validate(attendee.threeG, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('threeG');
        }
        if (!this.validate(attendee.voiceOnly, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('voiceOnly');
        }
        if (!this.validate(attendee.userId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }
        if (!this.validate(attendee.firstName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('firstName');
        }
        if (!this.validate(attendee.lastName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('lastName');
        }
        if (!this.validate(attendee.email, AvayaMeetingManagementClient.Constants.CONDITIONS.EMAIL)) {
            errors.push('email');
        }
        if (!this.validate(attendee.organizer, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('organizer');
        }
        if (!this.validate(attendee.host, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('host');
        }
        if (!this.validate(attendee.needOnMaster, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('needOnMaster');
        }
        if (!this.validate(attendee.autoDialIn, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoDialIn');
        }
        var mainPartyInLayoutRes = attendee.mainPartyInLayout.validate();
        if (!mainPartyInLayoutRes.success) {
            errors.push(mainPartyInLayoutRes.errors);
        }
        var customerPartyInLayoutRes = attendee.customerPartyInLayout.validate();
        if (!customerPartyInLayoutRes.success) {
            errors.push(customerPartyInLayoutRes.errors);
        }
        var partyOutLayoutRes = attendee.partyOutLayout.validate();
        if (!partyOutLayoutRes.success) {
            errors.push(partyOutLayoutRes.errors);
        }
        if (!this.validate(attendee.panelist, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('panelist');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AttendeeValidator = AttendeeValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.ReservedPortsValidator
     */
    function ReservedPortsValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    ReservedPortsValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate ReservedPorts object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.ReservedPorts} reservedPorts
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    ReservedPortsValidator.prototype.validateObject = function (reservedPorts) {
        var errors = [];

        if (!this.validate(reservedPorts.regular, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('regular');
        }
        if (!this.validate(reservedPorts.sd, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('sd');
        }
        if (!this.validate(reservedPorts.hd, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('hd');
        }
        if (!this.validate(reservedPorts.fullHD, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('fullHD');
        }
        if (!this.validate(reservedPorts.audioOnlyWC, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('audioOnlyWC');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.ReservedPortsValidator = ReservedPortsValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AdvancedPropertiesValidator
     */
    function AdvancedPropertiesValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AdvancedPropertiesValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate AdvancedProperties object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.AdvancedProperties} advancedProperties
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AdvancedPropertiesValidator.prototype.validateObject = function (advancedProperties) {
        var errors = [];

        if (!this.validate(advancedProperties.durationAfterLeft, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION)) {
            errors.push('durationAfterLeft');
        }
        if (!this.validate(advancedProperties.terminationCondition, AvayaMeetingManagementClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION)) {
            errors.push('terminationCondition');
        }
        if (!this.validate(advancedProperties.maxParticipants, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxParticipants');
        }
        if (!this.validate(advancedProperties.minutesBeforeTermination, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION)) {
            errors.push('minutesBeforeTermination');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AdvancedPropertiesValidator = AdvancedPropertiesValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.DailyValidator
     */
    function DailyValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    DailyValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Daily object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Daily} daily
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    DailyValidator.prototype.validateObject = function (daily) {
        var errors = [];

        if (!this.validate(daily.numberOfEveryDay, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('numberOfEveryDay');
        }
        if (!this.validate(daily.everyWeekDay, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('everyWeekDay');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.DailyValidator = DailyValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.WeeklyValidator
     */
    function WeeklyValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    WeeklyValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Weekly object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Weekly} weekly
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    WeeklyValidator.prototype.validateObject = function (weekly) {
        var errors = [];

        if (!this.validate(weekly.numberOfEveryWeek, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('numberOfEveryWeek');
        }

        var daysOfWeek = weekly.daysOfWeek;
        if (!Array.isArray(daysOfWeek)) {
            errors.push('daysOfWeek: is not an array');
        } else {
            for (var i = 0; i < daysOfWeek.length; i++) {
                var res = this.validate(daysOfWeek[i], AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK);
                if (!res) {
                    errors.push('daysOfWeek[' + i + ']:' + daysOfWeek[i]);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.WeeklyValidator = WeeklyValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.MonthlyValidator
     */
    function MonthlyValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    MonthlyValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate Monthly object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly} monthly
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    MonthlyValidator.prototype.validateObject = function (monthly) {
        var errors = [];

        if (!this.validate(monthly.numberOfEveryMonth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('numberOfEveryMonth');
        }
        if (!this.validate(monthly.dayOfMonth, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('dayOfMonth');
        }

        var dayOfNumberOfEveryMonthRes = monthly.dayOfNumberOfEveryMonth.validate();
        if (!dayOfNumberOfEveryMonthRes.success) {
            errors.push(dayOfNumberOfEveryMonthRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.MonthlyValidator = MonthlyValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.RecurrenceEndValidator
     */
    function RecurrenceEndValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    RecurrenceEndValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate RecurrenceEnd object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.RecurrenceEnd} recurrenceEnd
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    RecurrenceEndValidator.prototype.validateObject = function (recurrenceEnd) {
        var errors = [];

        if (!this.validate(recurrenceEnd.endOfOccurrences, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('endOfOccurrences');
        }

        try {
            new Date(recurrenceEnd.by);
        } catch (e) {
            errors.push('by');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.RecurrenceEndValidator = RecurrenceEndValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator
     */
    function DayOfNumberOfEveryMonthValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    DayOfNumberOfEveryMonthValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator
     * @desc Validate DayOfNumberOfEveryMonth object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Monthly.DayOfNumberOfEveryMonth} dayOfNumberOfEveryMonth
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    DayOfNumberOfEveryMonthValidator.prototype.validateObject = function (dayOfNumberOfEveryMonth) {
        var errors = [];

        if (!this.validate(dayOfNumberOfEveryMonth.weekOfMonth, AvayaMeetingManagementClient.Constants.CONDITIONS.WEEK_OF_MONTH)) {
            errors.push('weekOfMonth');
        }

        var dayOfWeek = dayOfNumberOfEveryMonth.dayOfWeek;
        if (!Array.isArray(dayOfWeek)) {
            errors.push('dayOfWeek: is not an array');
        } else {
            for (var i = 0; i < dayOfWeek.length; i++) {
                var res = this.validate(dayOfWeek[i], AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK);
                if (!res) {
                    errors.push('dayOfWeek[' + i + ']:' + dayOfWeek[i]);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.DayOfNumberOfEveryMonthValidator = DayOfNumberOfEveryMonthValidator;

})(AvayaMeetingManagementClient);

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

/**
 *   AvayaMeetingManagementClient.Providers.Validators
 */
(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Providers.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    PlainValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PlainValidator#validateMeetingStatus
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     * @desc Validate Meeting status for {@link AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS}
     * @private
     * @param {string} status
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PlainValidator.prototype.validateMeetingStatus = function (status) {
        var errors = [];

        if (!this.validate(status, AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS)) {
            errors.push('status');
        }

        return this.buildValidationResponse(errors);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PlainValidator#validateDate
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     * @desc Validate date for {@link AvayaMeetingManagementClient.Constants.CONDITIONS.DATE}
     * @private
     * @param {string} date
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PlainValidator.prototype.validateDate = function (date) {
        var errors = [];

        if (!this.validate(date, AvayaMeetingManagementClient.Constants.CONDITIONS.DATE)) {
            errors.push('date');
        }

        return this.buildValidationResponse(errors);
    };

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PlainValidator#validateTimeZone
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PlainValidator
     * @desc Validate Time zone for {@link AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE}
     * @private
     * @param {string} zone
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PlainValidator.prototype.validateTimeZone = function (zone) {
        var errors = [];

        if (!this.validate(zone, AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE)) {
            errors.push('timezone');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.PlainValidator = PlainValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator
     */
    function BroadcastSettingValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    BroadcastSettingValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator
     * @desc Validate Meeting object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} broadcastSetting
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    BroadcastSettingValidator.prototype.validateObject = function (broadcastSetting) {
        var errors = [];

        if (!this.validate(broadcastSetting.subject, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('subject');
        }

        if (!this.validate(broadcastSetting.pin, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('pin');
        }

        if (!this.validate(broadcastSetting.thumbnail, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('thumbnail');
        }

        if (!this.validate(broadcastSetting.thumbnailMimeType, AvayaMeetingManagementClient.Constants.CONDITIONS.IMAGE_MIME_TYPES)) {
            errors.push('thumbnailMimeType');
        }

        if (!this.validate(broadcastSetting.profile, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('profile');
        }

        if (!this.validate(broadcastSetting.description, AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT)) {
            errors.push('description');
        }

        if (!this.validate(broadcastSetting.public, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('public');
        }

        if (!this.validate(broadcastSetting.questionsAndAnswersEnabled, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('questionsAndAnswersEnabled');
        }

        if (!this.validate(broadcastSetting.moderatorPIN, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('moderatorPIN');
        }

        if (!this.validate(broadcastSetting.programeId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('programId');
        }

        var accessModeSettingRes = broadcastSetting.accessModeSetting.validate();
        if (!accessModeSettingRes.success) {
            errors.push(accessModeSettingRes.errors);
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.BroadcastSettingValidator = BroadcastSettingValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator
     */
    function BroadcastProfileValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    BroadcastProfileValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator
     * @desc Validate Broadcast Profile object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.BroadcastProfile} broadcastProfile
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    BroadcastProfileValidator.prototype.validateObject = function (broadcastProfile) {
        var errors = [];

        if (!this.validate(broadcastProfile.profilesId, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('profilesId');
        }

        if (!this.validate(broadcastProfile.profilesName, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('profilesName');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.BroadcastProfileValidator = BroadcastProfileValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting.AccessModeSetting} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator
     */
    function AccessModeSettingValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AccessModeSettingValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator
     * @desc Validate Meeting object with nested validation of all nested objects
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.BroadcastSetting} broadcastSetting
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AccessModeSettingValidator.prototype.validateObject = function (accessModeSetting) {
        var errors = [];

        if (!this.validate(accessModeSetting.accessMode, AvayaMeetingManagementClient.Constants.CONDITIONS.ACCESS_MODE)) {
            errors.push('accessMode');
        }

        if (!this.validate(accessModeSetting.userIds, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('userIds');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AccessModeSettingValidator = AccessModeSettingValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator
     */
    function ResourceAvailabilityValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    ResourceAvailabilityValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator
     * @desc Validate ResourceAvailability object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability} resourceAvailability
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    ResourceAvailabilityValidator.prototype.validateObject = function (resourceAvailability) {
        var errors = [];

        if (!this.validate(resourceAvailability.id, AvayaMeetingManagementClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(resourceAvailability.type, AvayaMeetingManagementClient.Constants.CONDITIONS.RESOURCE_TYPE)) {
            errors.push('type');
        }

        var availability = resourceAvailability.availability;
        if (!Array.isArray(availability)) {
            errors.push('availability: is not an array');
        } else {
            for (var i = 0; i < availability.length; i++) {
                var res = availability[i].validate();
                if (!res.success) {
                    errors.push('availability[' + i + ']:' + res.errors);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.ResourceAvailabilityValidator = ResourceAvailabilityValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator
     */
    function AvailabilityValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    AvailabilityValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator
     * @desc Validate Availability object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee.ResourceAvailability.Availability} availability
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    AvailabilityValidator.prototype.validateObject = function (availability) {
        var errors = [];

        try {
            new Date(availability.fromTime);
        } catch (e) {
            errors.push('fromTime');
        }
        try {
            new Date(availability.toTime);
        } catch (e) {
            errors.push('toTime');
        }
        if (!this.validate(availability.status, AvayaMeetingManagementClient.Constants.CONDITIONS.AVAILABILITY_STATUS)) {
            errors.push('status');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.AvailabilityValidator = AvailabilityValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Propositional} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator
     */
    function PropositionalValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    PropositionalValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator
     * @desc Validate Propositional object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Propositional} propositional
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PropositionalValidator.prototype.validateObject = function (propositional) {
        var errors = [];

        if (!this.validate(propositional.number, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('number');
        }

        if (!this.validate(propositional.virtualMeetingIDPrefix, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('virtualMeetingIDPrefix');
        }

        if (!this.validate(propositional.minimumMeetingIDLength, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('minimumMeetingIDLength');
        }

        if (!this.validate(propositional.defaultDuration, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('defaultDuration');
        }

        if (!this.validate(propositional.defaultDialMode, AvayaMeetingManagementClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE)) {
            errors.push('defaultDialMode');
        }

        if (!this.validate(propositional.termination, AvayaMeetingManagementClient.Constants.CONDITIONS.TERMINATION)) {
            errors.push('termination');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.PropositionalValidator = PropositionalValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.VideoLayoutValidator
     */
    function VideoLayoutValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    VideoLayoutValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate VideoLayout object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.VideoLayout} videoLayout
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    VideoLayoutValidator.prototype.validateObject = function (videoLayout) {
        var errors = [];

        if (!this.validate(videoLayout.layoutName, AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME)) {
            errors.push('layoutName');
        }
        if (!this.validate(videoLayout.layoutType, AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE)) {
            errors.push('layoutType');
        }
        if (!this.validate(videoLayout.dynamic, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('dynamic');
        }
        if (!this.validate(videoLayout.noSelfSee, AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('noSelfSee');
        }
        if (!this.validate(videoLayout.layoutMax, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('layoutMax');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.VideoLayoutValidator = VideoLayoutValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaMeetingManagementClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout} object
     * @private
     * @memberOf AvayaMeetingManagementClient.Providers.Validators
     * @define AvayaMeetingManagementClient.Providers.Validators.PartyLayoutValidator
     */
    function PartyLayoutValidator() {
        AvayaMeetingManagementClient.Base.Providers.Validator.call(this);
    }

    PartyLayoutValidator.prototype = Object.create(AvayaMeetingManagementClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaMeetingManagementClient.Providers.Validators.MeetingValidator#validateObject
     * @memberOf AvayaMeetingManagementClient.Providers.Validators.MeetingValidator
     * @desc Validate PartyLayout object
     * @private
     * @param {AvayaMeetingManagementClient.MeetingManagementService.Meeting.PartyLayout} partyLayout
     * @returns {AvayaMeetingManagementClient.Base.Responses.ObjectValidation}
     */
    PartyLayoutValidator.prototype.validateObject = function (partyLayout) {
        var errors = [];

        if (!this.validate(partyLayout.layoutName, AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME)) {
            errors.push('layoutName');
        }
        if (!this.validate(partyLayout.positionId, AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('positionId');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaMeetingManagementClient.Providers.Validators.PartyLayoutValidator = PartyLayoutValidator;

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @namespace
     * @desc RegExp patterns definitions
     * @private
     * @memberOf AvayaMeetingManagementClient.Constants
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS = AvayaMeetingManagementClient.Constants.CONDITIONS || {};

    /**
     * @namespace
     * @desc HTTP REST Content-types list
     * @private
     * @memberOf AvayaMeetingManagementClient.Constants
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES = AvayaMeetingManagementClient.Constants.CONTENT_TYPES || {};

})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETING = 'application/vnd.avaya.portal.meeting.schedule.v1+json';
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.SCHEDULE_MEETINGv2 = 'application/vnd.avaya.portal.meeting.schedule.v2+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETING = 'application/vnd.avaya.portal.meeting.update.v1+json';
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.UPDATE_MEETINGv2 = 'application/vnd.avaya.portal.meeting.update.v2+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.CANCEL_MEETING = 'application/vnd.avaya.portal.meeting.cancel.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.TERMINATE_MEETING = 'application/vnd.avaya.portal.meeting.terminate.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETING = 'application/vnd.avaya.portal.meeting.search.v1+json';
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.GET_MEETINGv2 = 'application/vnd.avaya.portal.meeting.search.v2+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.ERROR = 'application/vnd.avaya.csa.error.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.BROADCAST_PROFILE = 'application/vnd.avaya.portal.broadcast_profiles.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.RESOURCE_AVAILABILITY = 'application/vnd.avaya.portal.conference.resource_availability.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.VIRTUAL_ROOM = 'application/vnd.avaya.portal.conference.virtual_room.v1+json';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONTENT_TYPES
     * @define AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER
     */
    AvayaMeetingManagementClient.Constants.CONTENT_TYPES.PROPOSITIONAL_NUMBER = 'application/vnd.avaya.portal.conference.propositional_number.v1+json';
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.NUMBER = /^[-]{0,1}[0-9]{1,128}$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.STRING
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.STRING = /^.*$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TEXT = /^[\s\S]*$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ID
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ID = /^[0-9]{1,16}$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.BOOLEAN = /^TRUE$|^FALSE$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.EMAIL
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.EMAIL = /.+@.+\..+/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_UTC
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_UTC = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.DATE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.DATE = /^\d\d\d\d-\d\d-\d\d$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TIME_ZONE = /^[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_STATUS = /^ABNORMAL_STOPPED$|^CANCELLED$|^FINISHED$|^IN_SESSION$|^NOT_START$|^SCHEDULE_FAILED$|^START_FAILED$|^STOP_FAILED$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_DURATION = /^P(\d+Y){0,1}(\d+M){0,1}(\d+D){0,1}T(\d+H){0,1}(\d+M){0,1}([0-9.]+S){0,1}$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.MEETING_PRIORITY = /^DELAY$|^LOCAL$|^UNSPECIFIED$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ON_OFF_DISABLED = /^ON$|^OFF$|^DISABLED$|^UNDEFINED$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL = /^H323$|^ISDN$|^SIP$|^DUAL$|^MOBILE$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION = /^NORMAL$|^AFTER_ALL_PARTIES_LEFT$|^AFTER_HOST_LEFT$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.DAY_OF_WEEK = /^MON$|^TUE$|^WED$|^THU$|^FRI$|^SAT$|^SUN$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.WEEK_OF_MONTH
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.WEEK_OF_MONTH = /^FIRST$|^SECOND$|^THIRD$|^FOURTH$|^LATEST$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.ACCESS_MODE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.ACCESS_MODE = /^PRIVATE$|^LIMITED_USERS$|^ALL_AUTHED_USERS$|^ALL_USERS$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.AVAILABILITY_STATUS
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.AVAILABILITY_STATUS = /^BUSY$|^FREE$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.RESOURCE_TYPE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.RESOURCE_TYPE = /^TERMINAL$|^CONTACT$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.IMAGE_MIME_TYPES
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.IMAGE_MIME_TYPES = /^image\/jpeg$|^image\/jpg$|^image\/gif$|^image\/png$/i;
    
    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE = /^DIAL_OUT$|^DIAL_IN$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.TERMINATION
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.TERMINATION = /^SCHEDULE_END_TIME$|^ALL_ENDPOINT_LEFT$/i;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME = /^MAIN$|^CUSTOMER$/;

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants.CONDITIONS
     * @define AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE
     */
    AvayaMeetingManagementClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE =  /^0000$|^0100$|^0201$|^0202$|^0207$|^0302$|^0303$|^0400$|^0401$|^0402$|^0501$|^0600$|^0601$|^0705$|^0801$|^0900$|^0901$|^1001$|^1200$|^1301$|^1305$|^1600$|^2100$|^2101$|^2800$/i;
   //Full list //^0000$|^0100$|^0201$|^0202$|^0203$|^0204$|^0205$|^0206$|^0207$|^0302$|^0303$|^0400$|^0401$|^0402$|^0501$|^0600$|^0601$|^0602$|^0603$|^0705$|^0706$|^0801$|^0802$|^0900$|^0901$|^0902$|^1001$|^1002$|^1003$|^1004$|^1200$|^1301$|^1302$|^1303$|^1304$|^1305$|^1600$|^2100$|^2101$|^2800$/i;
})(AvayaMeetingManagementClient);

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

(function (AvayaMeetingManagementClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaMeetingManagementClient.Constants
     * @desc An array of available video layouts that provides id, maxParticipants data and 
     * coordination set for SVG drawing
     * @define AvayaMeetingManagementClient.Constants.LAYOUTS
     */
    AvayaMeetingManagementClient.Constants.LAYOUTS = [{
            id : '0000',
            bars : [],
            maxParticipants : 0
        }, {
            id : '0100',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 1
        }, {
            id : '0100',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 1
        }, {
            id : '0201',
            bars : [{
                    x1 : 1,
                    y1 : 8,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 8,
                    x2 : 49,
                    y2 : 22
                }
            ],
            maxParticipants : 2
        }, {
            id : '0202',
            bars : [{
                    x1 : 13,
                    y1 : 1,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 37,
                    y2 : 29
                }
            ],
            maxParticipants : 2
        }, {
            id : '0207',
            bars : [{
                    x1 : 1,
                    y1 : 6,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 49,
                    y2 : 24
                }
            ],
            maxParticipants : 2
        }, {
            id : '0302',
            bars : [{
                    x1 : 13,
                    y1 : 1,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 3
        }, {
            id : '0303',
            bars : [{
                    x1 : 1,
                    y1 : 6,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 6,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 49,
                    y2 : 24
                }
            ],
            maxParticipants : 3
        }, {
            id : '0400',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 4
        }, {
            id : '0401',
            bars : [{
                    x1 : 8,
                    y1 : 1,
                    x2 : 42,
                    y2 : 20
                }, {
                    x1 : 1,
                    y1 : 20,
                    x2 : 17,
                    y2 : 29
                }, {
                    x1 : 17,
                    y1 : 20,
                    x2 : 33,
                    y2 : 29
                }, {
                    x1 : 33,
                    y1 : 20,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 4
        }, {
            id : '0402',
            bars : [{
                    x1 : 1,
                    y1 : 4.5,
                    x2 : 37,
                    y2 : 25.5
                }, {
                    x1 : 37,
                    y1 : 4.5,
                    x2 : 49,
                    y2 : 11.5
                }, {
                    x1 : 37,
                    y1 : 11.5,
                    x2 : 49,
                    y2 : 18.5
                }, {
                    x1 : 37,
                    y1 : 18.5,
                    x2 : 49,
                    y2 : 25.5
                }
            ],
            maxParticipants : 4
        }, {
            id : '0501',
            bars : [{
                    x1 : 7,
                    y1 : 1,
                    x2 : 43,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 5
        }, {
            id : '0600',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 6
        }, {
            id : '0601',
            bars : [{
                    x1 : 1,
                    y1 : 5,
                    x2 : 17,
                    y2 : 14
                }, {
                    x1 : 17,
                    y1 : 5,
                    x2 : 33,
                    y2 : 14
                }, {
                    x1 : 33,
                    y1 : 5,
                    x2 : 49,
                    y2 : 14
                }, {
                    x1 : 1,
                    y1 : 14,
                    x2 : 17,
                    y2 : 23
                }, {
                    x1 : 17,
                    y1 : 14,
                    x2 : 33,
                    y2 : 23
                }, {
                    x1 : 33,
                    y1 : 14,
                    x2 : 49,
                    y2 : 23
                }
            ],
            maxParticipants : 6
        }, {
            id : '0705',
            bars : [{
                    x1 : 1,
                    y1 : 2.5,
                    x2 : 33,
                    y2 : 20.5
                }, {
                    x1 : 33,
                    y1 : 2.5,
                    x2 : 49,
                    y2 : 11.5
                }, {
                    x1 : 33,
                    y1 : 11.5,
                    x2 : 49,
                    y2 : 20.5
                }, {
                    x1 : 1,
                    y1 : 20.5,
                    x2 : 13,
                    y2 : 27.5
                }, {
                    x1 : 13,
                    y1 : 20.5,
                    x2 : 25,
                    y2 : 27.5
                }, {
                    x1 : 25,
                    y1 : 20.5,
                    x2 : 37,
                    y2 : 27.5
                }, {
                    x1 : 37,
                    y1 : 20.5,
                    x2 : 49,
                    y2 : 27.5
                }
            ],
            maxParticipants : 7
        }, {
            id : '0801',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 8
        }, {
            id : '0900',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 17,
                    y2 : 10.5
                }, {
                    x1 : 17,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 1,
                    y1 : 10.5,
                    x2 : 17,
                    y2 : 19.5
                }, {
                    x1 : 17,
                    y1 : 10.5,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 9
        }, {
            id : '0901',
            bars : [{
                    x1 : 13,
                    y1 : 1,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 9
        }, {
            id : '1001',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 10
        }, {
            id : '1200',
            bars : [{
                    x1 : 1,
                    y1 : 4.5,
                    x2 : 13,
                    y2 : 11.5
                }, {
                    x1 : 13,
                    y1 : 4.5,
                    x2 : 25,
                    y2 : 11.5
                }, {
                    x1 : 25,
                    y1 : 4.5,
                    x2 : 37,
                    y2 : 11.5
                }, {
                    x1 : 37,
                    y1 : 4.5,
                    x2 : 49,
                    y2 : 11.5
                }, {
                    x1 : 1,
                    y1 : 11.5,
                    x2 : 13,
                    y2 : 18.5
                }, {
                    x1 : 13,
                    y1 : 11.5,
                    x2 : 25,
                    y2 : 18.5
                }, {
                    x1 : 25,
                    y1 : 11.5,
                    x2 : 37,
                    y2 : 18.5
                }, {
                    x1 : 37,
                    y1 : 11.5,
                    x2 : 49,
                    y2 : 18.5
                }, {
                    x1 : 1,
                    y1 : 18.5,
                    x2 : 13,
                    y2 : 25.5
                }, {
                    x1 : 13,
                    y1 : 18.5,
                    x2 : 25,
                    y2 : 25.5
                }, {
                    x1 : 25,
                    y1 : 18.5,
                    x2 : 37,
                    y2 : 25.5
                }, {
                    x1 : 37,
                    y1 : 18.5,
                    x2 : 49,
                    y2 : 25.5
                }
            ],
            maxParticipants : 12
        }, {
            id : '1301',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 37,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 25,
                    y1 : 8,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 13
        }, {
            id : '1305',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 13,
                    y2 : 8
                }, {
                    x1 : 13,
                    y1 : 1,
                    x2 : 25,
                    y2 : 8
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 37,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 1,
                    y1 : 8,
                    x2 : 13,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 8,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 13
        }, {
            id : '1600',
            bars : [{
                    x1 : 1,
                    y1 : 1,
                    x2 : 13,
                    y2 : 8
                }, {
                    x1 : 13,
                    y1 : 1,
                    x2 : 25,
                    y2 : 8
                }, {
                    x1 : 25,
                    y1 : 1,
                    x2 : 37,
                    y2 : 8
                }, {
                    x1 : 37,
                    y1 : 1,
                    x2 : 49,
                    y2 : 8
                }, {
                    x1 : 1,
                    y1 : 8,
                    x2 : 13,
                    y2 : 15
                }, {
                    x1 : 13,
                    y1 : 8,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 8,
                    x2 : 37,
                    y2 : 15
                }, {
                    x1 : 37,
                    y1 : 8,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 13,
                    y2 : 22
                }, {
                    x1 : 13,
                    y1 : 15,
                    x2 : 25,
                    y2 : 22
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 37,
                    y2 : 22
                }, {
                    x1 : 37,
                    y1 : 15,
                    x2 : 49,
                    y2 : 22
                }, {
                    x1 : 1,
                    y1 : 22,
                    x2 : 13,
                    y2 : 29
                }, {
                    x1 : 13,
                    y1 : 22,
                    x2 : 25,
                    y2 : 29
                }, {
                    x1 : 25,
                    y1 : 22,
                    x2 : 37,
                    y2 : 29
                }, {
                    x1 : 37,
                    y1 : 22,
                    x2 : 49,
                    y2 : 29
                }
            ],
            maxParticipants : 16
        }, {
            id : '2100',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 9,
                    y2 : 6
                }, {
                    x1 : 9,
                    y1 : 1.5,
                    x2 : 17,
                    y2 : 6
                }, {
                    x1 : 17,
                    y1 : 1.5,
                    x2 : 25,
                    y2 : 6
                }, {
                    x1 : 25,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 6
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 41,
                    y2 : 6
                }, {
                    x1 : 41,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 6
                }, {
                    x1 : 1,
                    y1 : 6,
                    x2 : 9,
                    y2 : 10.5
                }, {
                    x1 : 1,
                    y1 : 10.5,
                    x2 : 9,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 9,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 9,
                    y2 : 24
                }, {
                    x1 : 9,
                    y1 : 6,
                    x2 : 41,
                    y2 : 24
                }, {
                    x1 : 41,
                    y1 : 6,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 41,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 41,
                    y1 : 15,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 41,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 24
                }, {
                    x1 : 1,
                    y1 : 24,
                    x2 : 9,
                    y2 : 28.5
                }, {
                    x1 : 9,
                    y1 : 24,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 24,
                    x2 : 25,
                    y2 : 28.5
                }, {
                    x1 : 25,
                    y1 : 24,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 24,
                    x2 : 41,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 24,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 21
        }, {
            id : '2101',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 41,
                    y2 : 6
                }, {
                    x1 : 41,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 6
                }, {
                    x1 : 33,
                    y1 : 6,
                    x2 : 41,
                    y2 : 10.5
                }, {
                    x1 : 41,
                    y1 : 6,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 41,
                    y2 : 15
                }, {
                    x1 : 41,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 41,
                    y2 : 19.5
                }, {
                    x1 : 41,
                    y1 : 15,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 9,
                    y2 : 24
                }, {
                    x1 : 9,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 24
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 25,
                    y2 : 24
                }, {
                    x1 : 25,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 1,
                    y1 : 24,
                    x2 : 9,
                    y2 : 28.5
                }, {
                    x1 : 9,
                    y1 : 24,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 24,
                    x2 : 25,
                    y2 : 28.5
                }, {
                    x1 : 25,
                    y1 : 24,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 24,
                    x2 : 41,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 24,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 21
        }, {
            id : '2800',
            bars : [{
                    x1 : 1,
                    y1 : 1.5,
                    x2 : 25,
                    y2 : 15
                }, {
                    x1 : 25,
                    y1 : 1.5,
                    x2 : 33,
                    y2 : 6
                }, {
                    x1 : 33,
                    y1 : 1.5,
                    x2 : 41,
                    y2 : 6
                }, {
                    x1 : 41,
                    y1 : 1.5,
                    x2 : 49,
                    y2 : 6
                }, {
                    x1 : 25,
                    y1 : 6,
                    x2 : 33,
                    y2 : 10.5
                }, {
                    x1 : 33,
                    y1 : 6,
                    x2 : 41,
                    y2 : 10.5
                }, {
                    x1 : 41,
                    y1 : 6,
                    x2 : 49,
                    y2 : 10.5
                }, {
                    x1 : 25,
                    y1 : 10.5,
                    x2 : 33,
                    y2 : 15
                }, {
                    x1 : 33,
                    y1 : 10.5,
                    x2 : 41,
                    y2 : 15
                }, {
                    x1 : 41,
                    y1 : 10.5,
                    x2 : 49,
                    y2 : 15
                }, {
                    x1 : 1,
                    y1 : 15,
                    x2 : 9,
                    y2 : 19.5
                }, {
                    x1 : 9,
                    y1 : 15,
                    x2 : 17,
                    y2 : 19.5
                }, {
                    x1 : 17,
                    y1 : 15,
                    x2 : 25,
                    y2 : 19.5
                }, {
                    x1 : 1,
                    y1 : 19.5,
                    x2 : 9,
                    y2 : 24
                }, {
                    x1 : 9,
                    y1 : 19.5,
                    x2 : 17,
                    y2 : 24
                }, {
                    x1 : 17,
                    y1 : 19.5,
                    x2 : 25,
                    y2 : 24
                }, {
                    x1 : 1,
                    y1 : 24,
                    x2 : 9,
                    y2 : 28.5
                }, {
                    x1 : 9,
                    y1 : 24,
                    x2 : 17,
                    y2 : 28.5
                }, {
                    x1 : 17,
                    y1 : 24,
                    x2 : 25,
                    y2 : 28.5
                }, {
                    x1 : 25,
                    y1 : 15,
                    x2 : 33,
                    y2 : 19.5
                }, {
                    x1 : 33,
                    y1 : 15,
                    x2 : 41,
                    y2 : 19.5
                }, {
                    x1 : 41,
                    y1 : 15,
                    x2 : 49,
                    y2 : 19.5
                }, {
                    x1 : 25,
                    y1 : 19.5,
                    x2 : 33,
                    y2 : 24
                }, {
                    x1 : 33,
                    y1 : 19.5,
                    x2 : 41,
                    y2 : 24
                }, {
                    x1 : 41,
                    y1 : 19.5,
                    x2 : 49,
                    y2 : 24
                }, {
                    x1 : 25,
                    y1 : 24,
                    x2 : 33,
                    y2 : 28.5
                }, {
                    x1 : 33,
                    y1 : 24,
                    x2 : 41,
                    y2 : 28.5
                }, {
                    x1 : 41,
                    y1 : 24,
                    x2 : 49,
                    y2 : 28.5
                }
            ],
            maxParticipants : 28
        }
    ];

})(AvayaMeetingManagementClient);