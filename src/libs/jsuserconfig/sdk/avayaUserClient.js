/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function(window) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Root object for User service
     * @public
     * @memberOf window
     * @define AvayaUserClient
     * @param {AvayaUserClient.Config.ClientConfig} clientConfig - data object with resources for service
     *
     * @example <caption>Create JSC SDK Client instance</caption>
     *     var client = new AvayaUserClient(clientConfig);
     */
    function AvayaUserClient(clientConfig) {
        if (!clientConfig) {
            return false;
        }

        if (clientConfig.logger) {
            window.aucLogger = clientConfig.logger;
        } else if (window.console) {
            window.aucLogger = window.console;
        } else {
            alert('Console object is not exist for that browser, no logging available then. Please provide specific Logger object.');
        }

        /**
         * @public
         * @type {AvayaUserClient.UserService}
         * @desc User service instance
         */
        this.userService = new AvayaUserClient.UserService(clientConfig.resources);
    }

    window.AvayaUserClient = AvayaUserClient;
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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @desc A bunch of base classes, constants, fixed objects that not depends on exact implementation or server type
     * @namespace AvayaUserClient.Base
     * @memberOf AvayaUserClient
     * @define AvayaUserClient.Base
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Base = AvayaUserClient.Base || {};
    })(AvayaUserClient);

    /**
     * @desc Shared base classes that can be extended for various use
     * @namespace AvayaUserClient.Base.Providers
     * @memberOf AvayaUserClient.Base
     * @define AvayaUserClient.Base.Providers
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Base.Providers = AvayaUserClient.Base.Providers || {};
    })(AvayaUserClient);

    /**
     * @desc Constants, resources, regexp patterns e t c
     * @namespace AvayaUserClient.Constants
     * @memberOf AvayaUserClient
     * @define AvayaUserClient.Constants
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Constants = AvayaUserClient.Constants || {};
    })(AvayaUserClient);

    /**
     * @desc Custom implementations for different server types, API versions and classes
     * @namespace AvayaUserClient.Providers
     * @memberOf AvayaUserClient
     * @define AvayaUserClient.Providers
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Providers = AvayaUserClient.Providers || {};
    })(AvayaUserClient);

    /**
     * @desc Validator classes for all existing objects
     * @namespace AvayaUserClient.Providers.Validators
     * @memberOf AvayaUserClient.Providers
     * @define AvayaUserClient.Providers.Validators
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Providers.Validators = AvayaUserClient.Providers.Validators || {};
    })(AvayaUserClient);

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @desc Contains prototypes of objects which are necessary to provide connection with various servers used by AvayaUserClient SDK.
     * @namespace AvayaUserClient.Config
     * @memberOf AvayaUserClient
     * @define AvayaUserClient.Config
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Config = AvayaUserClient.Config || {};
    })(AvayaUserClient);

    /**
     * @desc Specifies response objects for various request types
     * @namespace AvayaUserClient.Base.Responses
     * @memberOf AvayaUserClient.Base
     * @define AvayaUserClient.Base.Responses
     */
    (function(AvayaUserClient) {
        AvayaUserClient.Base.Responses = AvayaUserClient.Base.Responses || {};
    })(AvayaUserClient);

})(AvayaUserClient);

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

(function($, AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base REST provider
     * @private
     * @memberOf AvayaUserClient.Base.Providers
     * @define AvayaUserClient.Base.Providers.RequestBuilder
     */
    function RequestBuilder() {}

    /**
     * @function AvayaUserClient.Base.Providers.RequestBuilder#send
     * @memberOf AvayaUserClient.Base.Providers.RequestBuilder
     * @desc Send HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @param {boolean} isGuest - forgot password
     * @param isChangePass
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    RequestBuilder.prototype.send = function(opts, isGuest, isChangePass) {
        return $.ajax(isGuest === true ? opts : this.buildHeaders(opts, undefined, isChangePass));
    };

    /**
     * @function AvayaUserClient.Base.Providers.RequestBuilder#buildHeaders
     * @memberOf AvayaUserClient.Base.Providers.RequestBuilder
     * @desc Build specified headers for HTTP request
     * @private
     * @param {Object} opts - jQery ajax options object
     * @param isGuest
     * @param isChangePass
     * @returns {Object}
     */
    RequestBuilder.prototype.buildHeaders = function(opts, isGuest, isChangePass) {
        if(this.token !== undefined && !isChangePass){
            opts.headers.Authorization = 'UPToken ' + this.token;
        }

        return opts;
    };

    AvayaUserClient.Base.Providers.RequestBuilder = RequestBuilder;
})(jQuery, AvayaUserClient);

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

(function($, AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base validator class. Provide checks for basic types and some common functions. Not a final implementation, just preliminary methods.
     * @private
     * @memberOf AvayaUserClient.Base.Providers
     * @define AvayaUserClient.Base.Providers.Validator
     */
    function Validator() {}

    /**
     * @function AvayaUserClient.Base.Providers.Validator#isNumberType
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Check for number value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isNumberType = function(value) {
        return AvayaUserClient.Constants.CONDITIONS.NUMBER.test(value);
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#isIdType
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Check for ID type value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isIdType = function(value) {
        return AvayaUserClient.Constants.CONDITIONS.ID.test(value);
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#isStringType
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Check for string value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isStringType = function(value) {
        return AvayaUserClient.Constants.CONDITIONS.STRING.test(value);
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#isBooleanValue
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Check for boolean value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isBooleanValue = function(value) {
        return AvayaUserClient.Constants.CONDITIONS.BOOLEAN.test(value);
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#isEmptyValue
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Check for empty value
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyValue = function(value) {
        return (value === '' || value === null || value === undefined);
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#isEmptyString
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Check for empty string
     * @private
     * @param value - value to check
     * @returns {boolean}
     */
    Validator.prototype.isEmptyString = function(value) {
        return typeof value === 'string' && value.trim() === '';
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#validate
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Validate value for custom criteria using RegExp expression
     * @private
     * @param value - value to check
     * @param {RegEx} criteria - {@link AvayaUserClient.Constants.CONDITIONS}
     * @param {boolean} isMandatory - if yes empty field will return false
     * @returns {boolean}
     */
    Validator.prototype.validate = function(value, criteria, isMandatory) {
        return criteria.test(value) || (!isMandatory && this.isEmptyValue(value));
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#errorInvalidObject
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Invalid object response as a {@link AvayaUserClient.Base.Responses.Promise} object
     * @private
     * @param {Object} - custom response object
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    Validator.prototype.errorInvalidObject = function(response) {
        aucLogger.warn('errorInvalidObject: %o', response);
        return $.Deferred().reject(response).promise();
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#errorCustomEvent
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Return custom response as a rejected {@link AvayaUserClient.Base.Responses.Promise} object
     * @private
     * @param {Object} - custom response object
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    Validator.prototype.errorCustomEvent = function(error) {
        aucLogger.warn('errorCustomEvent: %s', error);
        return $.Deferred().reject(error).promise();
    };

    /**
     * @function AvayaUserClient.Base.Providers.Validator#buildValidationResponse
     * @memberOf AvayaUserClient.Base.Providers.Validator
     * @desc Form response object based on number errors faced during validation
     * @private
     * @param {string[]} - Array of fields with error
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    Validator.prototype.buildValidationResponse = function(errors) {
        return new AvayaUserClient.Base.Responses.ObjectValidation(errors);
    };

    AvayaUserClient.Base.Providers.Validator = Validator;

})(jQuery, AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Base dto class for data objects.
     * @private
     * @memberOf AvayaUserClient.Base.Providers
     * @define AvayaUserClient.Base.Providers.Dto
     */
    function Dto() {
        /**
         * @private
         * @type {AvayaUserClient.Providers.Validators}
         * @desc Attaching Validator object to a class
         */
        this._validator = '';
    }

    /**
     * @function AvayaUserClient.Base.Providers.Dto#validate
     * @memberOf AvayaUserClient.Base.Providers.Dto
     * @public
     * @returns {AvayaUserClient.Providers.Validators}
     */
    Dto.prototype.validate = function () {
        return this._validator.validateObject(this);
    };

    AvayaUserClient.Base.Providers.Dto = Dto;

})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc User Service class that contains definitions of JSC SDK API. Only public methods defined here should be used by client-side layer.
     * @public
     * @memberOf AvayaUserClient
     * @define AvayaUserClient.UserService
     * @param {AvayaUserClient.Config.Resources} resources - data object with resources for service
     * @example <caption>Create Service instance, start it and API method call</caption>
     *     var client = new AvayaUserClient(resources);
     *     var service = client.userService;
     *     var token = localStorage.UPS_TOKEN;
     *
     *     service.start(token);
     *
     *     service.getUserConfig().fail(function (response) {
     *     console.log(JSON.stringify(response));
     *     }).done(function (response) {
     *     console.log('success');
     *     }).always(function () {
     *     console.log('Request logic is done.');
     *     });
     */
    function UserService(resources) {

        /**
         * @public
         * @type {AvayaUserClient.Config.Resources}
         */
        this.resources = resources;

        /**
         * @desc Custom implementation provider
         * @private
         * @type {AvayaUserClient.Providers.UserProvider}
         */
        this._provider = new AvayaUserClient.Providers.GuestProvider();

        /**
         * @private
         * @type {Boolean}
         */
        this._isStarted = false;

        AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources = resources;
    }

    /**
     * @function AvayaUserClient.UserService#isStarted
     * @memberOf AvayaUserClient.UserService
     * @desc Is User Service instance started or not
     * @public
     * @returns {boolean}
     */
    UserService.prototype.isStarted = function () {
        return this._isStarted;
    };

    /**
     * @function AvayaUserClient.UserService#start
     * @memberOf AvayaUserClient.UserService
     * @desc Start service for provided user data
     * @param {string} token - authentication token
     * @param {string} pictureUrls - object contains picture URLs
     * @public
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.start = function (token, pictureUrls) {
        var dfd = $.Deferred();

        AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources = this.resources;
        AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources.getPictureUrl = pictureUrls.get;
		AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources.postPictureUrl = pictureUrls.post;
		AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources.deletePictureUrl = pictureUrls.delete;
        AvayaUserClient.Base.Providers.RequestBuilder.prototype.token = token;
        this._provider = new AvayaUserClient.Providers.UserProvider();

        this._isStarted = true;
        aucLogger.log('JSCSDK User Service has started!');

        // Nothing to fail for now
        dfd.resolve();

        return dfd.promise();
    };

    /**
     * @function AvayaUserClient.UserService#stop
     * @memberOf AvayaUserClient.UserService
     * @desc Stop the user service
     * @public
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.stop = function () {
        var dfd = $.Deferred();

        AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources = this.resources;
        AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources.getPictureUrl = undefined;
		AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources.postPictureUrl = undefined;
		AvayaUserClient.Base.Providers.RequestBuilder.prototype.resources.deletePictureUrl = undefined;
        AvayaUserClient.Base.Providers.RequestBuilder.prototype.token = undefined;

        this._provider = new AvayaUserClient.Providers.GuestProvider();
        this._isStarted = false;
        aucLogger.log('User Service has stopped!');

        // Nothing to fail for now
        dfd.resolve();

        return dfd.promise();
    };

    /**
     * @function AvayaUserClient.UserService#getUserConfig
     * @memberOf AvayaUserClient.UserService
     * @desc Get User config
     * @public
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.getUserConfig = function () {
        return this._provider.getUserConfig();
    };

    /**
     * @function AvayaUserClient.UserService#updateUserConfig
     * @memberOf AvayaUserClient.UserService
     * @desc Update User config
     * @public
     * @param {AvayaUserClient.UserService.UserDetailsUpdate} userDetailsUpdate
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.updateUserConfig = function (userDetailsUpdate) {
        return this._provider.updateUserConfig(userDetailsUpdate);
    };

    /**
     * @function AvayaUserClient.UserService#changePassword
     * @memberOf AvayaUserClient.UserService
     * @desc This operation is used to change password. This method can be used to change paswword for loginned user, in that case only password and new password should be in the request. Or for guest user to restore forgotten password. In that case confirmation token should be in the request.
     * @public
     * @param {string} password
     * @param {string} confirmationToken
     * @param {string} newPassword
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.changePassword = function (password, confirmationToken, newPassword, userName, changePasswordHref) {
        return this._provider.changePassword(password, confirmationToken, newPassword, userName, changePasswordHref);
    };

    /**
     * @function AvayaUserClient.UserService#postPicture
     * @memberOf AvayaUserClient.UserService
     * @desc Upload picture for user
     * @public
     * @param {file} file
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.postPicture = function (file) {
        return this._provider.postPicture(file);
    };

    /**
     * @function AvayaUserClient.UserService#deletePicture
     * @memberOf AvayaUserClient.UserService
     * @desc Delete picture for user
     * @public
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserService.prototype.deletePicture = function () {
        return this._provider.deletePicture();
    };

    /**
     * @function AvayaUserClient.UserService#getPicture
     * @memberOf AvayaUserClient.UserService
     * @desc Get picture for user
     * @public
     * @returns {string} picture URL
     */
    UserService.prototype.getPicture = function () {
        return this._provider.getPicture();
    };

    AvayaUserClient.UserService = UserService;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Class that represents User Details instance
     * @private
     * @memberOf AvayaUserClient.UserService
     * @define AvayaUserClient.UserService.UserDetails
     * @param {Object|undefined} userDetails
     */
    function UserDetails(userDetails) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof userDetails !== 'undefined' && userDetails !== null) {
            this._givenName = userDetails.givenName || '';
            this._surname = userDetails.surname || '';
            this._nativeGivenName = userDetails.nativeGivenName || '';
            this._nativeSurname = userDetails.nativeSurname || '';
            this._displayName = userDetails.displayName || '';
            this._userId = userDetails.userId || '';
            this._userTimeZone = userDetails.userTimeZone || '';
            this._officePhoneNumber = userDetails.officePhoneNumber || '';
            this._language = userDetails.language || '';
            this._pictureUrl = userDetails.pictureUrl || '';
            this._preferences = userDetails.preferences || [];
            this._voicePromptLanguage = userDetails.voicePromptLanguage || 'en_us';
            this._conferencing = new AvayaUserClient.UserService.UserDetails.Conferencing(userDetails.conferencing);

            this._handles = [];
            if (userDetails.handles) {
                if (Array.isArray(userDetails.handles)) {
                    for (var i = 0; i < userDetails.handles.length; i++) {
                        this._handles.push(new AvayaUserClient.UserService.UserDetails.Handle(userDetails.handles[i]));
                    }
                } else {
                    this._handles.push(new AvayaUserClient.UserService.UserDetails.Handle(userDetails.handles));
                }
            }
            this._mobilePhoneNumbers = userDetails.mobilePhoneNumbers || [];
        } else {
            this._givenName = '';
            this._surname = '';
            this._nativeGivenName = '';
            this._nativeSurname = '';
            this._displayName = '';
            this._userId = '';
            this._userTimeZone = '';
            this._officePhoneNumber = '';
            this._language = '';
            this._pictureUrl = '';
            this._preferences = [];
            this._voicePromptLanguage = 'en_us';
            this._conferencing = new AvayaUserClient.UserService.UserDetails.Conferencing();
            this._handles = [];
            this._mobilePhoneNumbers = [];
        }

        this._validator = new AvayaUserClient.Providers.Validators.UserDetailsValidator();
    }

    UserDetails.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name givenName
     * @desc givenName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'givenName', {
        get : function () {
            return this._givenName;
        },
        set : function (val) {
            this._givenName = val;
        }
    });

    /**
     * @instance
     * @name surname
     * @desc surname field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'surname', {
        get : function () {
            return this._surname;
        },
        set : function (val) {
            this._surname = val;
        }
    });

    /**
     * @instance
     * @name nativeGivenName
     * @desc nativeGivenName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'nativeGivenName', {
        get : function () {
            return this._nativeGivenName;
        },
        set : function (val) {
            this._nativeGivenName = val;
        }
    });

    /**
     * @instance
     * @name nativeSurname
     * @desc nativeSurname field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'nativeSurname', {
        get : function () {
            return this._nativeSurname;
        },
        set : function (val) {
            this._nativeSurname = val;
        }
    });

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'displayName', {
        get : function () {
            return this._displayName;
        },
        set : function (val) {
            this._displayName = val;
        }
    });

    /**
     * @instance
     * @name userId
     * @desc userId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'userId', {
        get : function () {
            return this._userId;
        },
        set : function (val) {
            this._userId = val;
        }
    });

    /**
     * @instance
     * @name userTimeZone
     * @desc userTimeZone field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'userTimeZone', {
        get : function () {
            return this._userTimeZone;
        },
        set : function (val) {
            this._userTimeZone = val;
        }
    });

    /**
     * @instance
     * @name officePhoneNumber
     * @desc officePhoneNumber field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'officePhoneNumber', {
        get : function () {
            return this._officePhoneNumber;
        },
        set : function (val) {
            this._officePhoneNumber = val;
        }
    });

    /**
     * @instance
     * @name conferencing
     * @desc conferencing field description
     * @type {Object}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'conferencing', {
        get : function () {
            return this._conferencing;
        },
        set : function (conferencing) {
            this._conferencing = new AvayaUserClient.UserService.UserDetails.Conferencing(conferencing);
        }
    });

    /**
     * @instance
     * @name language
     * @desc language field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'language', {
        get : function () {
            return this._language;
        },
        set : function (val) {
            this._language = val;
        }
    });

    /**
     * @instance
     * @name pictureUrl
     * @desc pictureUrl field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'pictureUrl', {
        get : function () {
            return this._pictureUrl;
        },
        set : function (val) {
            this._pictureUrl = val;
        }
    });

    /**
     * @instance
     * @name preferences
     * @desc preferences field description
     * @type {Object[]}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'preferences', {
        get : function () {
            return this._preferences;
        },
        set : function (preferences) {
            this._preferences = [];
            if (preferences) {
                if (Array.isArray(preferences)) {
                    for (var i = 0; i < preferences.length; i++) {
                        this._preferences.push(preferences[i]);
                    }
                } else {
                    this._preferences.push(preferences);
                }
            }
        }
    });

    /**
     * @instance
     * @name voicePromptLanguage
     * @desc Current language for voice prompts
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'voicePromptLanguage', {
        get : function () {
            return this._voicePromptLanguage;
        },
        set : function (val) {
            this._voicePromptLanguage = val;
        }
    });

    /**
     * @instance
     * @name handles
     * @desc handles field description
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'handles', {
        get : function () {
            return this._handles;
        },
        set : function (handles) {
            this._handles = [];
            if (handles) {
                if (Array.isArray(handles)) {
                    for (var i = 0; i < handles.length; i++) {
                        this._handles.push(new AvayaUserClient.UserService.UserDetails.Handle(handles[i]));
                    }
                } else {
                    this._handles.push(new AvayaUserClient.UserService.UserDetails.Handle(handles));
                }
            }
        }
    });

    /**
     * @instance
     * @name mobilePhoneNumbers
     * @desc mobilePhoneNumbers field description
     * @type {Object[]}
     * @memberOf AvayaUserClient.UserService.UserDetails
     */
    Object.defineProperty(UserDetails.prototype, 'mobilePhoneNumbers', {
        get : function () {
            return this._mobilePhoneNumbers;
        },
        set : function (mobilePhoneNumbers) {
            this._mobilePhoneNumbers = [];
            if (mobilePhoneNumbers) {
                if (Array.isArray(mobilePhoneNumbers)) {
                    for (var i = 0; i < mobilePhoneNumbers.length; i++) {
                        this._mobilePhoneNumbers.push(mobilePhoneNumbers[i]);
                    }
                } else {
                    this._mobilePhoneNumbers.push(mobilePhoneNumbers);
                }
            }
        }
    });

    AvayaUserClient.UserService.UserDetails = UserDetails;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Class that represents User Details Update instance
     * @private
     * @memberOf AvayaUserClient.UserService
     * @define AvayaUserClient.UserService.UserDetailsUpdate
     * @param {Object|undefined} userDetailsUpdate
     */
    function UserDetailsUpdate(userDetailsUpdate) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof userDetailsUpdate !== 'undefined' && userDetailsUpdate !== null) {
            this._locationId = userDetailsUpdate.locationId || '';
            this._userTimeZone = userDetailsUpdate.userTimeZone || '';
            this._defaultVirtualRoom = userDetailsUpdate.defaultVirtualRoom || '';
            this._preferences = userDetailsUpdate.preferences || [];
            this._voicePromptLanguage = userDetailsUpdate.voicePromptLanguage || 'en_us';
            this._virtualRoomSettings = [];
            this._participantId = userDetailsUpdate.participantId || '';
            this._delegatedUsers = [];
            if (userDetailsUpdate.virtualRoomSettings) {
                if (Array.isArray(userDetailsUpdate.virtualRoomSettings)) {
                    for (var i = 0; i < userDetailsUpdate.virtualRoomSettings.length; i++) {
                        this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(userDetailsUpdate.virtualRoomSettings[i]));
                    }
                } else {
                    this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(userDetailsUpdate.virtualRoomSettings));
                }
            }

            if (userDetailsUpdate.delegatedUsers) {
                if (Array.isArray(userDetailsUpdate.delegatedUsers)) {
                    for (var j = 0; j < userDetailsUpdate.delegatedUsers.length; j++) {
                        this._delegatedUsers.push(new AvayaUserClient.UserService.UserDetails.DelegatedUsers(userDetailsUpdate.delegatedUsers[j]));
                    }
                }
            }
        } else {
            this._locationId = '';
            this._userTimeZone = '';
            this._defaultVirtualRoom = '';
            this._preferences = [];
            this._voicePromptLanguage = new AvayaUserClient.UserService.UserDetails.VoicePromptLanguage();
            this._virtualRoomSettings = [];
            this._participantId = '';
        }

        this._validator = new AvayaUserClient.Providers.Validators.UserDetailsUpdateValidator();
    }

    UserDetailsUpdate.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name locationId
     * @desc locationId field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'locationId', {
        get : function () {
            return this._locationId;
        },
        set : function (val) {
            this._locationId = val;
        }
    });

    /**
     * @instance
     * @name userTimeZone
     * @desc userTimeZone field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'userTimeZone', {
        get : function () {
            return this._userTimeZone;
        },
        set : function (val) {
            this._userTimeZone = val;
        }
    });

    /**
     * @instance
     * @name defaultVirtualRoom
     * @desc defaultVirtualRoom field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'defaultVirtualRoom', {
        get : function () {
            return this._defaultVirtualRoom;
        },
        set : function (val) {
            this._defaultVirtualRoom = val;
        }
    });

    /**
     * @instance
     * @name preferences
     * @desc preferences field description
     * @type {Object[]}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'preferences', {
        get : function () {
            return this._preferences;
        },
        set : function (preferences) {
            this._preferences = [];
            if (preferences) {
                if (Array.isArray(preferences)) {
                    for (var i = 0; i < preferences.length; i++) {
                        this._preferences.push(preferences[i]);
                    }
                } else {
                    this._preferences.push(preferences);
                }
            }
        }
    });

    /**
     * @instance
     * @name virtualRoomSettings
     * @desc virtualRoomSettings field description
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'virtualRoomSettings', {
        get : function () {
            return this._virtualRoomSettings;
        },
        set : function (virtualRoomSettings) {
            this._virtualRoomSettings = [];
            if (virtualRoomSettings) {
                if (Array.isArray(virtualRoomSettings)) {
                    for (var i = 0; i < virtualRoomSettings.length; i++) {
                        this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(virtualRoomSettings[i]));
                    }
                } else {
                    this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(virtualRoomSettings));
                }
            }
        }
    });

    /**
     * @instance
     * @name voicePromptLanguage
     * @desc Current language for voice prompts
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'voicePromptLanguage', {
        get : function () {
            return this._voicePromptLanguage;
        },
        set : function (val) {
            this._voicePromptLanguage = val;
        }
    });

    /**
     * @instance
     * @name participantId
     * @desc Current language for voice prompts
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetailsUpdate
     */
    Object.defineProperty(UserDetailsUpdate.prototype, 'participantId', {
        get : function () {
            return this._participantId;
        },
        set : function (val) {
            this._participantId = val;
        }
    });


    AvayaUserClient.UserService.UserDetailsUpdate = UserDetailsUpdate;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails
     * @define AvayaUserClient.UserService.UserDetails.Conferencing
     * @param {Object|undefined} conferencing
     */
    function Conferencing(conferencing) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof conferencing !== 'undefined' && conferencing !== null) {
            this._localUser = conferencing.localUser || false;
            this._canReserveMeetingsFromOutlookPlugin = conferencing.canReserveMeetingsFromOutlookPlugin || false;
            this._allowRandomMeetingID = conferencing.allowRandomMeetingID || false;
            this._scopiaUserId = conferencing.scopiaUserId || '';
            this._scopiaMemberId = conferencing.scopiaMemberId || '';
            this._defaultTerminalId = conferencing.defaultTerminalId || '';
            this._defaultTerminalNumber = conferencing.defaultTerminalNumber || '';
            this._defaultVirtualRoom = conferencing.defaultVirtualRoom || '';
            this._maxBandWidth = conferencing.maxBandWidth || '';
            this._recordingPolicy = conferencing.recordingPolicy || '';
            this._locationId = conferencing.locationId || '';
            this._schedulable = conferencing.schedulable || false;
            this._participantId = conferencing.participantId || '';
            this._reservable = conferencing.reservable || false;
            this._allowStreaming = conferencing.allowStreaming || false;
            this._allowRecording = conferencing.allowRecording || false;
            this._allowUseOthersVirtualRoom = conferencing.allowUseOthersVirtualRoom || false;
            this._canScheduleEventConference = conferencing.canScheduleEventConference || false;
            this._propositional = new AvayaUserClient.UserService.UserDetails.Conferencing.Propositional(conferencing.propositional);

            this._userGroups = [];
            if (conferencing.userGroups) {
                if (Array.isArray(conferencing.userGroups)) {
                    for (var i = 0; i < conferencing.userGroups.length; i++) {
                        this._userGroups.push(new AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup(conferencing.userGroups[i]));
                    }
                } else {
                    this._userGroups.push(new AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup(conferencing.userGroups));
                }
            }

            this._virtualRoomSettings = [];
            if (conferencing.virtualRoomSettings) {
                if (Array.isArray(conferencing.virtualRoomSettings)) {
                    for (var j = 0; j < conferencing.virtualRoomSettings.length; j++) {
                        this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(conferencing.virtualRoomSettings[j]));
                    }
                } else {
                    this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(conferencing.virtualRoomSettings));
                }

            }

            this._meetingServiceList = [];
            if (conferencing.meetingServiceList) {
                if (Array.isArray(conferencing.meetingServiceList)) {
                    for (var k = 0; k < conferencing.meetingServiceList.length; k++) {
                        this._meetingServiceList.push(new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService(conferencing.meetingServiceList[k]));
                    }
                } else {
                    this._meetingServiceList.push(new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService(conferencing.meetingServiceList));
                }
            }

            this._availableVoicePromptLanguages = [];
            if (conferencing.availableVoicePromptLanguages) {
                if (Array.isArray(conferencing.availableVoicePromptLanguages)) {
                    for (var o = 0; o < conferencing.availableVoicePromptLanguages.length; o++) {
                        this._availableVoicePromptLanguages.push(new AvayaUserClient.UserService.UserDetails.VoicePromptLanguage(conferencing.availableVoicePromptLanguages[o]));
                    }
                } else {
                    this._availableVoicePromptLanguages.push(new AvayaUserClient.UserService.UserDetails.VoicePromptLanguage(conferencing.availableVoicePromptLanguages));
                }
            }
            this._availableDialInLocations = [];
            if (conferencing.availableDialInLocations) {
                if (Array.isArray(conferencing.availableDialInLocations)) {
                    for (var locIdx = 0; locIdx < conferencing.availableDialInLocations.length; locIdx++) {
                        this._availableDialInLocations.push(new AvayaUserClient.UserService.UserDetails.AvailableDialInLocations(conferencing.availableDialInLocations[locIdx]));
                    }
                } else {
                    this._availableDialInLocations.push(new AvayaUserClient.UserService.UserDetails.AvailableDialInLocations(conferencing.availableDialInLocations));
                }
            }



            this._availableInvitationLanguages = [];
            if (conferencing.availableInvitationLanguages) {
                if (Array.isArray(conferencing.availableInvitationLanguages)) {
                    for (var a = 0; a < conferencing.availableInvitationLanguages.length; a++) {
                        this._availableInvitationLanguages.push(new AvayaUserClient.UserService.UserDetails.InvitationLanguages(conferencing.availableInvitationLanguages[a]));
                    }
                } else {
                    this._availableInvitationLanguages.push(new AvayaUserClient.UserService.UserDetails.InvitationLanguages(conferencing.availableInvitationLanguages));
                }
            }

            this._delegatedUsers = [];
            if (conferencing.delegatedUsers) {
                if (Array.isArray(conferencing.delegatedUsers)) {
                    for (var b = 0; b < conferencing.delegatedUsers.length; b++) {
                        this._delegatedUsers.push(new AvayaUserClient.UserService.UserDetails.DelegatedUsers(conferencing.delegatedUsers[b]));
                    }
                }
            }
        } else {
            this._localUser = false;
            this._canReserveMeetingsFromOutlookPlugin = false;
            this._allowRandomMeetingID = false;
            this._scopiaUserId = '';
            this._scopiaMemberId = '';
            this._defaultTerminalId = '';
            this._defaultTerminalNumber = '';
            this._defaultVirtualRoom = '';
            this._maxBandWidth = '';
            this._recordingPolicy = '';
            this._locationId = '';
            this._schedulable = false;
            this._participantId = '';
            this._reservable = false;
            this._allowStreaming = false;
            this._allowRecording = false;
            this._allowUseOthersVirtualRoom = false;
            this._canScheduleEventConference = false;

            this._userGroups = [];
            this._virtualRoomSettings = [];
            this._meetingServiceList = [];
            this._availableVoicePromptLanguages = [];
            this._availableDialInLocations = [];
            this._availableInvitationLanguages = [];
            this._delegatedUsers = [];
            this._propositional = new AvayaUserClient.UserService.UserDetails.Conferencing.Propositional();
        }

        this._validator = new AvayaUserClient.Providers.Validators.ConferencingValidator();
    }

    Conferencing.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name localUser
     * @desc if true it's Scopia user if false - LDAP one
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'localUser', {
        get : function () {
            return this._localUser;
        },
        set : function (val) {
            this._localUser = val;
        }
    });

    /**
     * @instance
     * @name localUser
     * @desc if true it's Scopia user if false - LDAP one
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'canReserveMeetingsFromOutlookPlugin', {
        get : function () {
            return this._canReserveMeetingsFromOutlookPlugin;
        }
    });

    /**
     * @instance
     * @name scopiaUserId
     * @desc scopiaUserId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'scopiaUserId', {
        get : function () {
            return this._scopiaUserId;
        },
        set : function (val) {
            this._scopiaUserId = val;
        }
    });

    /**
     * @instance
     * @name scopiaMemberId
     * @desc scopiaMemberId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'scopiaMemberId', {
        get : function () {
            return this._scopiaMemberId;
        },
        set : function (val) {
            this._scopiaMemberId = val;
        }
    });

    /**
     * @instance
     * @name defaultTerminalId
     * @desc defaultTerminalId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'defaultTerminalId', {
        get : function () {
            return this._defaultTerminalId;
        },
        set : function (val) {
            this._defaultTerminalId = val;
        }
    });

    /**
     * @instance
     * @name defaultTerminalNumber
     * @desc defaultTerminalNumber field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'defaultTerminalNumber', {
        get : function () {
            return this._defaultTerminalNumber;
        },
        set : function (val) {
            this._defaultTerminalNumber = val;
        }
    });

    /**
     * @instance
     * @name defaultVirtualRoom
     * @desc defaultVirtualRoom field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'defaultVirtualRoom', {
        get : function () {
            return this._defaultVirtualRoom;
        },
        set : function (val) {
            this._defaultVirtualRoom = val;
        }
    });

    /**
     * @instance
     * @name maxBandWidth
     * @desc maxBandWidth field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'maxBandWidth', {
        get : function () {
            return this._maxBandWidth;
        },
        set : function (val) {
            this._maxBandWidth = val;
        }
    });

    /**
     * @instance
     * @name recordingPolicy
     * @desc recordingPolicy field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'recordingPolicy', {
        get : function () {
            return this._recordingPolicy;
        },
        set : function (val) {
            this._recordingPolicy = val;
        }
    });

    /**
     * @instance
     * @name locationId
     * @desc locationId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'locationId', {
        get : function () {
            return this._locationId;
        },
        set : function (val) {
            this._locationId = val;
        }
    });

    /**
     * @instance
     * @name schedulable
     * @desc schedulable field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'schedulable', {
        get : function () {
            return this._schedulable;
        },
        set : function (val) {
            this._schedulable = val;
        }
    });

    /**
     * @instance
     * @name participantId
     * @desc participantId field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'participantId', {
        get : function () {
            return this._participantId;
        },
        set : function (val) {
            this._participantId = val;
        }
    });

    /**
     * @instance
     * @name reservable
     * @desc reservable field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'reservable', {
        get : function () {
            return this._reservable;
        },
        set : function (val) {
            this._reservable = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc allowStreaming field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'allowStreaming', {
        get : function () {
            return this._allowStreaming;
        },
        set : function (val) {
            this._allowStreaming = val;
        }
    });

    /**
     * @instance
     * @name allowRecording
     * @desc allowRecording field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'allowRecording', {
        get : function () {
            return this._allowRecording;
        },
        set : function (val) {
            this._allowRecording = val;
        }
    });

    /**
     * @instance
     * @name allowUseOthersVirtualRoom
     * @desc allowUseOthersVirtualRoom field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'allowUseOthersVirtualRoom', {
        get : function () {
            return this._allowUseOthersVirtualRoom;
        },
        set : function (val) {
            this._allowUseOthersVirtualRoom = val;
        }
    });
    /**
     * @instance
     * @name allowRandomMeetingID
     * @desc allowRandomMeetingID is user allowed top schedule meeting with random meeting id
     * @type {boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'allowRandomMeetingID', {
        get : function () {
            return this._allowRandomMeetingID;
        },
        set : function (val) {
            this._allowRandomMeetingID = val;
        }
    });

    /**
     * @instance
     * @name canScheduleEventConference
     * @desc ability of user to schedule Large event meeting
     * @type {boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'canScheduleEventConference', {
        get : function () {
            return this._canScheduleEventConference;
        },
        set : function (val) {
            this._canScheduleEventConference = val;
        }
    });

    /**
     * @instance
     * @name propositional
     * @desc propositional field description
     * @type {AvayaUserClient.UserService.UserDetails.Conferencing.Propositional}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'propositional', {
        get : function () {
            return this._propositional;
        },
        set : function (propositional) {
            this._propositional = new AvayaUserClient.UserService.UserDetails.Conferencing.Propositional(propositional);
        }
    });

    /**
     * @instance
     * @name userGroups
     * @desc userGroups field description
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'userGroups', {
        get : function () {
            return this._userGroups;
        },
        set : function (userGroups) {
            this._userGroups = [];
            if (userGroups) {
                if (Array.isArray(userGroups)) {
                    for (var i = 0; i < userGroups.length; i++) {
                        this._userGroups.push(new AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup(userGroups[i]));
                    }
                } else {
                    this._userGroups.push(new AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup(userGroups));
                }
            }
        }
    });

    /**
     * @instance
     * @name virtualRoomSettings
     * @desc virtualRoomSettings field description
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'virtualRoomSettings', {
        get : function () {
            return this._virtualRoomSettings;
        },
        set : function (virtualRoomSettings) {
            this._virtualRoomSettings = [];
            if (virtualRoomSettings) {
                if (Array.isArray(virtualRoomSettings)) {
                    for (var i = 0; i < virtualRoomSettings.length; i++) {
                        this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(virtualRoomSettings[i]));
                    }
                } else {
                    this._virtualRoomSettings.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup(virtualRoomSettings));
                }
            }
        }
    });

    /**
     * @instance
     * @name meetingServiceList
     * @desc meetingServiceList field description
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'meetingServiceList', {
        get : function () {
            return this._meetingServiceList;
        },
        set : function (meetingServiceList) {
            this._meetingServiceList = [];
            if (meetingServiceList) {
                if (Array.isArray(meetingServiceList)) {
                    for (var i = 0; i < meetingServiceList.length; i++) {
                        this._meetingServiceList.push(new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService(meetingServiceList[i]));
                    }
                } else {
                    this._meetingServiceList.push(new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService(meetingServiceList));
                }
            }
        }
    });

    /**
     * @instance
     * @name availableVoicePromptLanguages
     * @desc List of available locales for voice prompts
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'availableVoicePromptLanguages', {
        get : function () {
            return this._availableVoicePromptLanguages;
        },
        set : function (availableVoicePromptLanguages) {
            this._availableVoicePromptLanguages = [];
            if (availableVoicePromptLanguages) {
                if (Array.isArray(availableVoicePromptLanguages)) {
                    for (var i = 0; i < availableVoicePromptLanguages.length; i++) {
                        this._availableVoicePromptLanguages.push(VoicePromptLanguage);
                    }
                } else {
                    this._availableVoicePromptLanguages.push(new AvayaUserClient.UserService.UserDetails.VoicePromptLanguage(availableVoicePromptLanguages));
                }
            }
        }
    });
    /**
     * @instance
     * @name availableDialInLocations
     * @desc List of available locations for invite email
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'availableDialInLocations', {
        get : function () {
            return this._availableDialInLocations;
        },
        set : function (availableDialInLocations) {
            this._availableDialInLocations = [];
            if (availableDialInLocations) {
                if (Array.isArray(availableDialInLocations)) {
                    for (var locIdx = 0; locIdx < availableDialInLocations.length; locIdx++) {
                        this._availableDialInLocations.push(new AvayaUserClient.UserService.UserDetails.AvailableDialInLocations(availableDialInLocations[locIdx]));
                    }
                } else {
                    this._availableDialInLocations.push(new AvayaUserClient.UserService.UserDetails.AvailableDialInLocations(availableDialInLocations));
                }
            }
        }
    });

    /**
     * @instance
     * @name availableInvitationLanguages
     * @desc List of available locales for voice prompts
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'availableInvitationLanguages', {
        get : function () {
            return this._availableInvitationLanguages;
        },
        set : function (availableInvitationLanguages) {
            this._availableInvitationLanguages = [];
            if (availableInvitationLanguages) {
                if (Array.isArray(availableInvitationLanguages)) {
                    for (var i = 0; i < availableInvitationLanguages.length; i++) {
                        this._availableInvitationLanguages.push(InvitationLanguages);
                    }
                } else {
                    this._availableInvitationLanguages.push(new AvayaUserClient.UserService.UserDetails.InvitationLanguages(availableInvitationLanguages));
                }
            }
        }
    });

    /**
     * @instance
     * @name delegatedUsers
     * @desc List of available locales for voice prompts
     * @type {Object[]|Object}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     */
    Object.defineProperty(Conferencing.prototype, 'delegatedUsers', {
        get : function () {
            return this._delegatedUsers;
        },
        set : function (delegatedUsers) {
            this._delegatedUsers = [];
            if (delegatedUsers) {
                if (Array.isArray(delegatedUsers)) {
                    for (var i = 0; i < delegatedUsers.length; i++) {
                        this._delegatedUsers.push(delegatedUsers[i]);
                    }
                } else {
                    this._delegatedUsers.push(new AvayaUserClient.UserService.UserDetails.DelegatedUsers(delegatedUsers));
                }
            }
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing = Conferencing;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails
     * @define AvayaUserClient.UserService.UserDetails.Handle
     * @param {Object|undefined} handle
     */
    function Handle(handle) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof handle !== 'undefined' && handle !== null) {
            this._address = handle.address || '';
            this._type = handle.type || '';
        } else {
            this._address = '';
            this._type = '';
        }

        this._validator = new AvayaUserClient.Providers.Validators.HandleValidator();
    }

    Handle.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name address
     * @desc address field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Handle
     */
    Object.defineProperty(Handle.prototype, 'address', {
        get : function () {
            return this._address;
        },
        set : function (val) {
            this._address = val;
        }
    });

    /**
     * @instance
     * @name type
     * @desc type field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Handle
     */
    Object.defineProperty(Handle.prototype, 'type', {
        get : function () {
            return this._type;
        },
        set : function (val) {
            this._type = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Handle = Handle;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails
     * @define AvayaUserClient.UserService.UserDetails.VoicePromptLanguage
     * @param {Object|undefined} voicePromptLanguage
     */
    function VoicePromptLanguage(voicePromptLanguage) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof voicePromptLanguage !== 'undefined' && voicePromptLanguage !== null) {
            this._id = voicePromptLanguage.id || 'en_us';
            this._displayName = voicePromptLanguage.displayName || 'English(U.S.)';
        } else {
            this._id = 'en_us';
            this._displayName = 'English(U.S.)';
        }

        this._validator = new AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator();
    }

    VoicePromptLanguage.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc id field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.VoicePromptLanguage
     */
    Object.defineProperty(VoicePromptLanguage.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.VoicePromptLanguage
     */
    Object.defineProperty(VoicePromptLanguage.prototype, 'displayName', {
        get : function () {
            return this._displayName;
        },
        set : function (val) {
            this._displayName = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.VoicePromptLanguage = VoicePromptLanguage;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails
     * @define AvayaUserClient.UserService.UserDetails.DelegatedUsers
     * @param delegatedUser
     */
    function DelegatedUsers(delegatedUser) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (delegatedUser) {
            this._userId = delegatedUser.userId;
            this._displayName = delegatedUser.displayName;
            this._firstName = delegatedUser.firstName;
            this._lastName = delegatedUser.lastName;
        }

        this._validator = new AvayaUserClient.Providers.Validators.DelegatedUsersValidator();
    }

    DelegatedUsers.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.DelegatedUsers
     */
    Object.defineProperty(DelegatedUsers.prototype, 'displayName', {
        get : function () {
            return this._displayName;
        },
        set : function (val) {
            this._displayName = val;
        }
    });

    /**
     * @instance
     * @name firstName
     * @desc firstName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.DelegatedUsers
     */
    Object.defineProperty(DelegatedUsers.prototype, 'firstName', {
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
     * @desc lastName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.DelegatedUsers
     */
    Object.defineProperty(DelegatedUsers.prototype, 'lastName', {
        get : function () {
            return this._lastName;
        },
        set : function (val) {
            this._lastName = val;
        }
    });

    /**
     * @instance
     * @name userId
     * @desc userId field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.DelegatedUsers
     */
    Object.defineProperty(DelegatedUsers.prototype, 'userId', {
        get : function () {
            return this._userId;
        },
        set : function (val) {
            this._userId = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.DelegatedUsers = DelegatedUsers;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails
     * @define AvayaUserClient.UserService.UserDetails.AvailableDialInLocations
     * @param {Object|undefined} availableDialInLocations
     */
    function AvailableDialInLocations(availableDialInLocations) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof availableDialInLocations !== 'undefined' && availableDialInLocations !== null) {
            this._id = availableDialInLocations.id || 'dialin_en_us';
            this._displayName = availableDialInLocations.displayName || availableDialInLocations.label || availableDialInLocations.id;
            this._label = availableDialInLocations.label || availableDialInLocations.displayName ||  availableDialInLocations.id;
            this._number = availableDialInLocations.number || '';

        } else {
            this._id = 'en_us';
            this._displayName = 'English(U.S.)';
            this._label = 'United States';
            this._number = '';
        }

        this._validator = new AvayaUserClient.Providers.Validators.AvailableDialInLocationsValidator();
    }

    AvailableDialInLocations.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc id field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.AvailableDialInLocations
     */
    Object.defineProperty(AvailableDialInLocations.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.AvailableDialInLocations
     */
    Object.defineProperty(AvailableDialInLocations.prototype, 'displayName', {
        get : function () {
            return this._displayName;
        },
        set : function (val) {
            this._displayName = val;
        }
    });

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.AvailableDialInLocations
     */
    Object.defineProperty(AvailableDialInLocations.prototype, 'label', {
        get : function () {
            return this._label;
        },
        set : function (val) {
            this._label = val;
        }
    });

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.AvailableDialInLocations
     */
    Object.defineProperty(AvailableDialInLocations.prototype, 'number', {
        get : function () {
            return this._number;
        },
        set : function (val) {
            this._number = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.AvailableDialInLocations = AvailableDialInLocations;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails
     * @define AvayaUserClient.UserService.UserDetails.InvitationLanguages
     * @param {Object|undefined} InvitationLanguages
     */
    function InvitationLanguages(invitationLanguages) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof invitationLanguages !== 'undefined' && invitationLanguages !== null) {
            this._id = invitationLanguages.id || 'en_us';
            this._displayName = invitationLanguages.displayName || 'English(U.S.)';
        } else {
            this._id = 'en_us';
            this._displayName = 'English(U.S.)';
        }

        this._validator = new AvayaUserClient.Providers.Validators.InvitationLanguageValidator();
    }

    InvitationLanguages.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name id
     * @desc id field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.InvitationLanguages
     */
    Object.defineProperty(InvitationLanguages.prototype, 'id', {
        get : function () {
            return this._id;
        },
        set : function (val) {
            this._id = val;
        }
    });

    /**
     * @instance
     * @name displayName
     * @desc displayName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.InvitationLanguages
     */
    Object.defineProperty(InvitationLanguages.prototype, 'displayName', {
        get : function () {
            return this._displayName;
        },
        set : function (val) {
            this._displayName = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.InvitationLanguages = InvitationLanguages;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup
     * @param {Object|undefined} userGroup
     */
    function UserGroup(userGroup) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof userGroup !== 'undefined' && userGroup !== null) {
            this._groupId = userGroup.groupId || '';
            this._name = userGroup.name || '';
        } else {
            this._groupId = '';
            this._name = '';
        }

        this._validator = new AvayaUserClient.Providers.Validators.UserGroupValidator();
    }

    UserGroup.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name groupId
     * @desc groupId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup
     */
    Object.defineProperty(UserGroup.prototype, 'groupId', {
        get : function () {
            return this._groupId;
        },
        set : function (val) {
            this._groupId = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc name field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup
     */
    Object.defineProperty(UserGroup.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup = UserGroup;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     * @param {Object|undefined} virtualRoomSetup
     */
    function VirtualRoomSetup(virtualRoomSetup) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof virtualRoomSetup !== 'undefined' && virtualRoomSetup !== null) {
            this._memberId = virtualRoomSetup.memberId || '';
            this._virtualRoomId = virtualRoomSetup.virtualRoomId || '';
            this._number = virtualRoomSetup.number || '';
            this._accessPIN = virtualRoomSetup.accessPIN || '';
            this._moderatorPIN = virtualRoomSetup.moderatorPIN || '';
            this._serviceTemplateId = virtualRoomSetup.serviceTemplateId || '';
            this._servicePrefix = virtualRoomSetup.servicePrefix || '';
            this._priority = virtualRoomSetup.priority || '';
            this._protectMeetingWithParticipantId = virtualRoomSetup.protectMeetingWithParticipantId || false;
            this._allowStreaming = virtualRoomSetup.allowStreaming || false;
            this._streamingStatus = virtualRoomSetup.streamingStatus || '';
            this._voicePromptLanguage = virtualRoomSetup.voicePromptLanguage || 'en_us';
            this._invitationLanguage = virtualRoomSetup.invitationLanguage || 'en_us';
            this._entryAnnouncement = virtualRoomSetup.entryAnnouncement || '0';
            this._exitAnnouncement = virtualRoomSetup.exitAnnouncement || '0';
            this._maxPlayToneNumber = virtualRoomSetup.maxPlayToneNumber || 0;
            this._maxPlayNameNumber = virtualRoomSetup.maxPlayNameNumber || 0;
            this._preferredDialInLocation = virtualRoomSetup.preferredDialInLocation || 'dialin_en_us';
            this._allowPresentPolicy = virtualRoomSetup.allowPresentPolicy || '0';
            this._fixedMeetingType = virtualRoomSetup.fixedMeetingType || false;

            this._attendees = [];
            if (virtualRoomSetup.attendees) {
                if (Array.isArray(virtualRoomSetup.attendees)) {
                    for (var i = 0; i < virtualRoomSetup.attendees.length; i++) {
                        this._attendees.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee(virtualRoomSetup.attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee(virtualRoomSetup.attendees));
                }
            }



            this._blockDialIn = virtualRoomSetup.blockDialIn || false;
            this._autoExtend = virtualRoomSetup.autoExtend || false;
            this._waitingRoom = virtualRoomSetup.waitingRoom || false;
            this._oneTimePINRequired = virtualRoomSetup.oneTimePINRequired || false;
            this._name = virtualRoomSetup.name || '';
            this._description = virtualRoomSetup.description || '';
            this._allowRecording = virtualRoomSetup.allowRecording || false;
            this._defaultRoom = virtualRoomSetup.defaultRoom || false;
            this._publicRoom = virtualRoomSetup.publicRoom || false;
            this._maxParticipants = virtualRoomSetup.maxParticipants || '';
            this._maxRoomParticipants = virtualRoomSetup.maxRoomParticipants === 0 ? 0 : virtualRoomSetup.maxRoomParticipants || '';
            this._allowKnocking = virtualRoomSetup.allowKnocking || false;
            this._allowInstantMeeting = virtualRoomSetup.allowInstantMeeting || false;

            this._reservedPorts = new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts(virtualRoomSetup.reservedPorts);
            this._advancedProperties = new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties(virtualRoomSetup.advancedProperties);
            this._moderatorPinUpdateRequired = virtualRoomSetup.moderatorPinUpdateRequired || false;

        } else {
            this._memberId = '';
            this._virtualRoomId = '';
            this._number = '';
            this._accessPIN = '';
            this._moderatorPIN = '';
            this._serviceTemplateId = '';
            this._servicePrefix = '';
            this._priority = '';
            this._protectMeetingWithParticipantId = false;
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
            this._maxRoomParticipants = '';
            this._allowKnocking = false;
            this._allowInstantMeeting = false;
            this._voicePromptLanguage = 'en_us';
            this._invitationLanguage = 'en_us';
            this._entryAnnouncement = '0';
            this._exitAnnouncement = '0';
            this._maxPlayToneNumber = 0;
            this._maxPlayNameNumber = 0;
            this._preferredDialInLocation = 'dialin_en_us';
            this._allowPresentPolicy = '0';
            this._fixedMeetingType = false;

            this._reservedPorts = new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts();
            this._advancedProperties = new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties();
            this._moderatorPinUpdateRequired = false;
        }

        this._validator = new AvayaUserClient.Providers.Validators.VirtualRoomSetupValidator();
    }

    VirtualRoomSetup.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name fixedMeetingType
     * @desc fixedMeetingType field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'fixedMeetingType', {
        get : function () {
            return this._fixedMeetingType;
        },
        set : function (val) {
            this._fixedMeetingType = val;
        }
    });

    /**
     * @instance
     * @name memberId
     * @desc memberId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'memberId', {
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
     * @desc virtualRoomId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'virtualRoomId', {
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
     * @desc number field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'number', {
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
     * @desc accessPIN field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'accessPIN', {
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
     * @desc moderatorPIN field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'moderatorPIN', {
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
     * @desc serviceTemplateId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'serviceTemplateId', {
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
     * @desc servicePrefix field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'servicePrefix', {
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
     * @desc priority field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'priority', {
        get : function () {
            return this._priority;
        },
        set : function (val) {
            this._priority = val;
        }
    });

    /**
     * @instance
     * @name protectMeetingWithParticipantId
     * @desc protectMeetingWithParticipantId field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'protectMeetingWithParticipantId', {
        get : function () {
            return this._protectMeetingWithParticipantId;
        },
        set : function (val) {
            this._protectMeetingWithParticipantId = val;
        }
    });

    /**
     * @instance
     * @name allowStreaming
     * @desc allowStreaming field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'allowStreaming', {
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
     * @desc streamingStatus field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'streamingStatus', {
        get : function () {
            return this._streamingStatus;
        },
        set : function (val) {
            this._streamingStatus = val;
        }
    });

    /**
     * @instance
     * @name voicePromptLanguage
     * @desc voicePromptLanguage field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'voicePromptLanguage', {
        get : function () {
            return this._voicePromptLanguage;
        },
        set : function (val) {
            this._voicePromptLanguage = val;
        }
    });

    /**
     * @instance
     * @name invitationLanguage
     * @desc invitationLanguage field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'invitationLanguage', {
        get : function () {
            return this._invitationLanguage;
        },
        set : function (val) {
            this._invitationLanguage = val;
        }
    });

    /**
     * @instance
     * @name entryAnnouncement
     * @desc entryAnnouncement field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'entryAnnouncement', {
        get : function () {
            return this._entryAnnouncement;
        },
        set : function (val) {
            this._entryAnnouncement = val;
        }
    });

    /**
     * @instance
     * @name exitAnnouncement
     * @desc exitAnnouncement field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'exitAnnouncement', {
        get : function () {
            return this._exitAnnouncement;
        },
        set : function (val) {
            this._exitAnnouncement = val;
        }
    });

    /**
     * @instance
     * @name maxPlayToneNumber
     * @desc maxPlayToneNumber field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'maxPlayToneNumber', {
        get : function () {
            return this._maxPlayToneNumber;
        },
        set : function (val) {
            this._maxPlayToneNumber = val;
        }
    });

    /**
     * @instance
     * @name maxPlayNameNumber
     * @desc maxPlayNameNumber field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'maxPlayNameNumber', {
        get : function () {
            return this._maxPlayNameNumber;
        },
        set : function (val) {
            this._maxPlayNameNumber = val;
        }
    });

    /**
     * @instance
     * @name preferredDialInLocation
     * @desc preferredDialInLocation field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'preferredDialInLocation', {
        get : function () {
            return this._preferredDialInLocation;
        },
        set : function (val) {
            this._preferredDialInLocation = val;
        }
    });

    /**
     * @instance
     * @name allowPresentPolicy
     * @desc allowPresentPolicy field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */

    Object.defineProperty(VirtualRoomSetup.prototype, 'allowPresentPolicy', {
        get : function () {
            return this._allowPresentPolicy;
        },
        set : function (val) {
            this._allowPresentPolicy = val;
        }
    });

    /**
     * @instance
     * @name attendees
     * @desc attendees field description
     * @type {AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee[]}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'attendees', {
        get : function () {
            return this._attendees;
        },
        set : function (attendees) {
            this._attendees = [];
            if (attendees) {
                if (Array.isArray(attendees)) {
                    for (var i = 0; i < attendees.length; i++) {
                        this._attendees.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee(attendees[i]));
                    }
                } else {
                    this._attendees.push(new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee(attendees));
                }
            }
        }
    });

    /**
     * @instance
     * @name reservedPorts
     * @desc reservedPorts field description
     * @type {AvayaVirtualRoomSetupManagementClient.VirtualRoomSetupManagementService.VirtualRoomSetup.ReservedPorts}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'reservedPorts', {
        get : function () {
            return this._reservedPorts;
        },
        set : function (reservedPorts) {
            this._reservedPorts = new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts(reservedPorts);
        }
    });

    /**
     * @instance
     * @name blockDialIn
     * @desc blockDialIn field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'blockDialIn', {
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
     * @desc autoExtend field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'autoExtend', {
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
     * @desc waitingRoom field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'waitingRoom', {
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
     * @desc advancedProperties field description
     * @type {AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'advancedProperties', {
        get : function () {
            return this._advancedProperties;
        },
        set : function (advancedProperties) {
            this._advancedProperties = new AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties(advancedProperties);
        }
    });

    /**
     * @instance
     * @name oneTimePINRequired
     * @desc oneTimePINRequired field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'oneTimePINRequired', {
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
     * @desc name field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'name', {
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
     * @desc description field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'description', {
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
     * @desc allowRecording field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'allowRecording', {
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
     * @desc defaultRoom field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'defaultRoom', {
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
     * @desc publicRoom field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'publicRoom', {
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
     * @desc maxParticipants field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'maxParticipants', {
        get : function () {
            return this._maxParticipants;
        },
        set : function (val) {
            this._maxParticipants = val;
        }
    });

    /**
     * @instance
     * @name maxRoomParticipants
     * @desc maxRoomParticipants field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'maxRoomParticipants', {
        get : function () {
            return this._maxRoomParticipants;
        },
        set : function (val) {
            this._maxRoomParticipants = val;
        }
    });

    /**
     * @instance
     * @name allowKnocking
     * @desc allowKnocking field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'allowKnocking', {
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
     * @desc allowInstantMeeting field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'allowInstantMeeting', {
        get : function () {
            return this._allowInstantMeeting;
        },
        set : function (val) {
            this._allowInstantMeeting = val;
        }
    });

    /**
     * @instance
     * @name moderatorPinUpdateRequired
     * @type {boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     */
    Object.defineProperty(VirtualRoomSetup.prototype, 'moderatorPinUpdateRequired', {
        get : function () {
            return this._moderatorPinUpdateRequired;
        },
        set : function (val) {
            this._moderatorPinUpdateRequired = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup = VirtualRoomSetup;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
     * @param {Object|undefined} attendee
     */
    function Attendee(attendee) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof attendee !== 'undefined' && attendee !== null) {
            this._terminalId = attendee.terminalId || '';
            if (attendee.protocol) {
                this._protocol = attendee.protocol;
            }
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
        } else {
            this._terminalId = '';
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
        }

        this._validator = new AvayaUserClient.Providers.Validators.AttendeeValidator();
    }

    Attendee.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name terminalId
     * @desc terminalId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc protocol field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc terminalName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc terminalNumber field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc maxBandwidth field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc maxISDNBandwidth field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc areaCode field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc countryCode field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc telephoneNumber field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc restrictedMode field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc threeG field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc voiceOnly field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc userId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc firstName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc lastName field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc email field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc organizer field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
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
     * @desc host field description
     * @type {string|boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee
     */
    Object.defineProperty(Attendee.prototype, 'host', {
        get : function () {
            return this._host;
        },
        set : function (val) {
            this._host = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee = Attendee;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts
     * @param {Object|undefined} reservedPorts
     */
    function ReservedPorts(reservedPorts) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof reservedPorts !== 'undefined' && reservedPorts !== null) {
            this._regular = reservedPorts.regular || '';
            this._sd = reservedPorts.sd || '';
            this._hd = reservedPorts.hd || '';
            this._fullHD = reservedPorts.fullHD || '';
        } else {
            this._regular = '';
            this._sd = '';
            this._hd = '';
            this._fullHD = '';
        }

        this._validator = new AvayaUserClient.Providers.Validators.ReservedPortsValidator();
    }

    ReservedPorts.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name regular
     * @desc regular field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts
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
     * @desc sd field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts
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
     * @desc hd field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts
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
     * @desc fullHD field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts
     */
    Object.defineProperty(ReservedPorts.prototype, 'fullHD', {
        get : function () {
            return this._fullHD;
        },
        set : function (val) {
            this._fullHD = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts = ReservedPorts;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties
     * @param {Object|undefined} advancedProperties
     */
    function AdvancedProperties(advancedProperties) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof advancedProperties !== 'undefined' && advancedProperties !== null) {
            this._durationAfterLeft = advancedProperties.durationAfterLeft || '';
            this._terminationCondition = advancedProperties.terminationCondition || '';
            this._maxParticipants = advancedProperties.maxParticipants || '';
        } else {
            this._durationAfterLeft = '';
            this._terminationCondition = '';
            this._maxParticipants = '';
        }

        this._validator = new AvayaUserClient.Providers.Validators.AdvancedPropertiesValidator();
    }

    AdvancedProperties.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name durationAfterLeft
     * @desc durationAfterLeft field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties
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
     * @desc terminationCondition field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties
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
     * @desc maxParticipants field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties
     */
    Object.defineProperty(AdvancedProperties.prototype, 'maxParticipants', {
        get : function () {
            return this._maxParticipants;
        },
        set : function (val) {
            this._maxParticipants = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties = AdvancedProperties;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
     * @param {Object|undefined} propositional
     */
    function Propositional(propositional) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof propositional !== 'undefined' && propositional !== null) {
            this._number = propositional.number || '';
            this._virtualMeetingIDPrefix = propositional.virtualMeetingIDPrefix || '';
            this._minimumMeetingIDLength = propositional.minimumMeetingIDLength || '';
            this._defaultDuration = propositional.defaultDuration || '';
            this._defaultDialMode = propositional.defaultDialMode || '';
            this._termination = propositional.termination || '';
            this._terminationTime = propositional.terminationTime || 10;
            this._showEndTimeReplaceDuration = propositional.showEndTimeReplaceDuration || false;
        } else {
            this._number = '';
            this._virtualMeetingIDPrefix = '';
            this._minimumMeetingIDLength = '';
            this._defaultDuration = '';
            this._defaultDialMode = '';
            this._termination = '';
            this._terminationTime = 10;
            this._showEndTimeReplaceDuration = false;
        }

        this._validator = new AvayaUserClient.Providers.Validators.PropositionalValidator();
    }

    Propositional.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name number
     * @desc number field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
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
     * @desc virtualMeetingIDPrefix field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
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
     * @desc minimumMeetingIDLength field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
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
     * @desc defaultDuration field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
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
     * @desc defaultDialMode field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
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
     * @desc termination field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'termination', {
        get : function () {
            return this._termination;
        },
        set : function (val) {
            this._termination = val;
        }
    });

    /**
     * @instance
     * @name terminationTime
     * @desc terminationTime field description
     * @type {number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'terminationTime', {
        get : function () {
            return this._terminationTime;
        },
        set : function (val) {
            this._terminationTime = val;
        }
    });

    /**
     * @instance
     * @name showEndTimeReplaceDuration
     * @desc showEndTimeReplaceDuration field description
     * @type {boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.Propositional
     */
    Object.defineProperty(Propositional.prototype, 'showEndTimeReplaceDuration', {
        get : function () {
            return this._showEndTimeReplaceDuration;
        },
        set : function (val) {
            this._showEndTimeReplaceDuration = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.Propositional = Propositional;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     * @param {Object|undefined} meetingService
     */
    function MeetingService(meetingService) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof meetingService !== 'undefined' && meetingService !== null) {
            this._default = meetingService.default || '';
            this._description = meetingService.description || '';
            this._mediaProperty = meetingService.mediaProperty || '';
            this._name = meetingService.name || '';
            this._prefix = meetingService.prefix || '';
            this._serviceId = meetingService.serviceId || '';
            this._mainVideoLayout = new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout(meetingService.mainVideoLayout);
            this._customerVideoLayout = new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout(meetingService.customerVideoLayout);
        } else {
            this._default = '';
            this._description = '';
            this._mediaProperty = '';
            this._name = '';
            this._prefix = '';
            this._serviceId = '';
            this._mainVideoLayout = new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout();
            this._customerVideoLayout = new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout();
          }

        this._validator = new AvayaUserClient.Providers.Validators.MeetingServiceValidator();
    }

    MeetingService.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name default
     * @desc default field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'default', {
        get : function () {
            return this._default;
        },
        set : function (val) {
            this._default = val;
        }
    });

    /**
     * @instance
     * @name description
     * @desc description field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'description', {
        get : function () {
            return this._description;
        },
        set : function (val) {
            this._description = val;
        }
    });

    /**
     * @instance
     * @name mediaProperty
     * @desc mediaProperty field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'mediaProperty', {
        get : function () {
            return this._mediaProperty;
        },
        set : function (val) {
            this._mediaProperty = val;
        }
    });

    /**
     * @instance
     * @name name
     * @desc name field description
     * @type {string}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'name', {
        get : function () {
            return this._name;
        },
        set : function (val) {
            this._name = val;
        }
    });

    /**
     * @instance
     * @name prefix
     * @desc prefix field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'prefix', {
        get : function () {
            return this._prefix;
        },
        set : function (val) {
            this._prefix = val;
        }
    });

    /**
     * @instance
     * @name serviceId
     * @desc serviceId field description
     * @type {string|number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'serviceId', {
        get : function () {
            return this._serviceId;
        },
        set : function (val) {
            this._serviceId = val;
        }
    });

    /**
     * @instance
     * @name mainVideoLayout
     * @desc mainVideoLayout (User Config API v.2)
     * @type {AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'mainVideoLayout', {
        get : function () {
            return this._mainVideoLayout;
        },
        set : function (mainVideoLayout) {
            this._mainVideoLayout = new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout(mainVideoLayout);
        }
    });

    /**
     * @instance
     * @name customerVideoLayout
     * @desc customerVideoLayout (User Config API v.2)
     * @type {AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     */
    Object.defineProperty(MeetingService.prototype, 'customerVideoLayout', {
        get : function () {
            return this._customerVideoLayout;
        },
        set : function (mainVideoLayout) {
            this._customerVideoLayout = new AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout(customerVideoLayout);
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService = MeetingService;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @desc Customizable Video Layout for participant (User Config API v.2)
     * Subclass of {@link AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService} object.
     * @private
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService
     * @define AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout
     * @param {Object|undefined} videoLayout
     */
    function VideoLayout(videoLayout) {

        AvayaUserClient.Base.Providers.Dto.call(this);

        if (typeof videoLayout !== 'undefined' && videoLayout !== null) {
            this._layoutName = videoLayout.layoutName || 'MAIN';
            this._layoutType = videoLayout.layoutType || '0000';
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

        this._validator = new AvayaUserClient.Providers.Validators.VideoLayoutValidator();
    }

    VideoLayout.prototype = Object.create(AvayaUserClient.Base.Providers.Dto.prototype);

    /**
     * @instance
     * @name layoutName
     * @desc Video Layout name (Main|Customer) (User Config API v.2)
     * @type {AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout
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
     * @desc Video Layout type (User Config API v.2)
     * @type {AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout
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
     * @desc dynamic field description (User Config API v.2)
     * @type {boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout
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
     * @desc noSelfSee field description (User Config API v.2)
     * @type {boolean}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout
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
     * @desc layoutMax field description (User Config API v.2)
     * @type {number}
     * @memberOf AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout
     */
    Object.defineProperty(VideoLayout.prototype, 'layoutMax', {
        get : function () {
            return this._layoutMax;
        },
        set : function (val) {
            this._layoutMax = val;
        }
    });

    AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout = VideoLayout;
})(AvayaUserClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Response is returned by object validators
     * @private
     * @memberOf AvayaUserClient.Base.Responses
     * @define AvayaUserClient.Base.Responses.ObjectValidation
     * @param {string[]} errors - array of fields with error
     */
    function ObjectValidation(errors) {

        /**
         * @public
         * @type {Boolean}
         */
        this.success = errors.length === 0;

        /**
         * @public
         * @type {Array}
         * @desc Returns an array of fields should be fixed
         */
        this.errors = errors;

        return this;
    }

    AvayaUserClient.Base.Responses.ObjectValidation = ObjectValidation;
})(AvayaUserClient);

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
(function (AvayaUserClient) {
    'use strict';
    /**
     * jQuery promise, created from jQuery.Deferred object. See jQuery docs for more detailed information.
     * Promised are used to resolve server responses to requests performed by AvayaClientServices.
     *
     * See {@tutorial async} for more information.
     *
     * Note that since all Promise methods return themselves, the methods can be easily chained.
     *
     * @example <caption>Adding participants to a conversation</caption>
     * var successCallback = function(){
     *      console.log("Participants added!");
     * };
     * var failCallback = function(){
     *      console.log("Error");
     * };
     * conversation.addParticipants(participants).then(successCallback, failCallback);
     * // do something else...
     * // when the Promise is resolved, console will print "Participants added!"
     *
     * @example <caption>Chaining methods</caption>
     * conversation.addParticipants(participants).done(doOneThing).done(doOther).done(doAnother).fail(onError);
     *
     *
     * @class
     * @memberOf AvayaClientServices.Base
     * @define AvayaClientServices.Base.Responses.Promise
     */
    function Promise() {
        /**
         * NOTE: This class does nothing!
         * It is only use to document jQuery Promise object in order to provide syntax completion.
         */
    }

    Promise.prototype =
        /** @lends AvayaClientServices.Base.Responses.Promise.prototype **/
    {
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
         * @returns {AvayaClientServices.Base.Responses.Promise}
         */
        always : function (alwaysCallback) {},

        /**
         * Add handlers to be called when the Deferred object is resolved.
         *
         * @example
         * conversation.addParticipants(participants).done(function(data){
         *      //invoked on success
         *      //e.g. refresh the UI
         * });
         *
         * @param {function} doneCallback A function, or array of functions, that are called when the Deferred is resolved.
         * @returns {AvayaClientServices.Base.Responses.Promise}
         */
        done : function (doneCallback) {},

        /**
         * Add handlers to be called when the Deferred object is rejected.
         *
         * @example
         * conversation.addParticipants(participants).fail(function(error){
         *      //invoked on failure
         *      //e.g. show error in UI
         * });
         *
         * @public
         * @param {function} failCallback A function, or array of functions, that are called when the Deferred is rejected.
         * @returns {AvayaClientServices.Base.Responses.Promise}
         */
        fail : function (failCallback) {},

        /**
         * Add handlers to be called when the Deferred object generates progress notifications. Please note that not every Promise
         * creates progress notifications.
         *
         * @example
         * conversation.addParticipants(participants).progress(function(progressObject){
         *      //invoked on progress
         *      //e.g. refresh progress bar
         * });
         *
         * @public
         * @param {function} progressCallback A function, or array of functions, to be called when the Deferred generates progress notifications.
         * @returns {AvayaClientServices.Base.Responses.Promise}
         */
        progress : function (progressCallback) {},

        /**
         * Add handlers to be called for the Deferred object. Combines functionality of .done(), .fail() and .progress().
         *
         * @example
         * conversation.addParticipants(participants).then(function(data){
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
         * @returns {AvayaClientServices.Base.Responses.Promise}
         */
        then : function (doneCallback, failCallback, progressCallback) {}
    };

    AvayaUserClient.Base.Responses.Promise = Promise;

})(AvayaUserClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Response is returned to query config request
     * @private
     * @memberOf AvayaUserClient.Base.Responses
     * @define AvayaUserClient.Base.Responses.QueryMeetingResponse
     * @param {string} returnValue - success or error condition
     * @param {Object} userConfig - user config
     */
    function QueryConfigResponse(returnValue, userConfig) {

        /**
         * @public
         * @type {OK|ConfigNotFound|Error|FATAL}
         */
        this.returnValue = returnValue;

        /**
         * @public
         * @type {Object}
         * @desc Returns user config in case of success
         */
        this.userConfig = userConfig;

        return this;
    }

    AvayaUserClient.Base.Responses.QueryConfigResponse = QueryConfigResponse;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc Server data object to communicate with service
     * @public
     * @memberOf AvayaUserClient.Config
     * @define AvayaUserClient.Config.ClientConfig
     * @param {Object} config - data object with resources for service
     */
    function ClientConfig(config) {

        if (config) {
            /**
             * @public
             * @type {AvayaUserClient.Config.Resources}
             * @desc resources for service
             */
            this.resources = new AvayaUserClient.Config.Resources(config);
        }
    }

    AvayaUserClient.Config.ClientConfig = ClientConfig;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @classdesc User resources
     * @public
     * @memberOf AvayaUserClient.Config
     * @define AvayaUserClient.Config.Resources
     * @param {Object} config - user resources config
     */
    function Resources(config) {

        if (config) {

            if (config.self) {
                /**
                 * @public
                 * @type {string}
                 * @desc User ID
                 */
                this.userId = config.self.userId || '';

                /**
                 * @public
                 * @type {string}
                 * @desc Email
                 */
                this.email = config.self.email || '';

                /**
                 * @public
                 * @type {string}
                 * @desc first name
                 */
                this.firstName = config.self.firstName || '';

                /**
                 * @public
                 * @type {string}
                 * @desc last name
                 */
                this.lastName = config.self.lastName || '';
            }

            /**
             * @public
             * @type {boolean}
             * @desc if multitenant is enabled
             */
            this.multitenant = config.multitenant || false;

            /**
             * @public
             * @type {boolean}
             * @desc if Intergrated Windows Authentication is enabled
             */
            this.iwaEnabled = config.iwaEnabled || false;

            /**
             * @public
             * @type {string}
             * @desc link to Windows Client
             */
            this.linkToWindowsClient = config.linkToWindowsClient || '';

            /**
             * @public
             * @type {string}
             * @desc link to Mac Client
             */
            this.linkToMacClient = config.linkToMacClient || '';

            this.getUserDetailsServerApiVersions = [AvayaUserClient.Constants.CONTENT_TYPES.FETCH];
            this.addUpdateUserPreferencesServerApiVersions = [AvayaUserClient.Constants.CONTENT_TYPES.UPDATE];
            this.changePasswordServerApiVersions = [AvayaUserClient.Constants.CONTENT_TYPES.CHANGE_PASS];

            if (config.resources) {

                if (config.resources.user) {

                    if (config.resources.user.GET && config.resources.user.GET.getUserDetails) {
                        /**
                         * @public
                         * @type {string}
                         * @desc getUserDetails URL. Should be passed provided ACS resources
                         */
                        this.getUserDetails = config.resources.user.GET.getUserDetails.href || '';
                        /**
                         * @public
                         * @type {string[]}
                         * @desc Supported by Server API versions array for getUserDetails response
                         */
                        this.getUserDetailsServerApiVersions = config.resources.user.GET.getUserDetails.responseTypes || '';
                        /**
                         * @public
                         * @type {string[]}
                         * @desc Request types API versions array for getUserDetails request
                         */
                        this.getUserDetailsRequestTypes = config.resources.user.GET.getUserDetails.requestTypes || '';
                    }

                    if (config.resources.user.POST && config.resources.user.POST.addUserPreferences) {
                        /**
                         * @public
                         * @type {string}
                         * @desc addUserPreferences URL
                         */
                        this.addUpdateUserPreferences = config.resources.user.POST.addUserPreferences.href || '';
                        /**
                         * @public
                         * @type {string[]}
                         * @desc Supported by Server API versions array for addUserPreferences response
                         */
                        this.addUpdateUserPreferencesRequestTypes = config.resources.user.POST.addUserPreferences.requestTypes || '';
                        /**
                         * @public
                         * @type {string[]}
                         * @desc Request types API versions array for addUserPreferences request
                         */
                        this.addUpdateUserPreferencesServerApiVersions = config.resources.user.POST.addUserPreferences.responseTypes || '';
                    }
                }

                if (config.resources.authentication && config.resources.authentication.POST && config.resources.authentication.POST.changePassword) {
                    /**
                     * @public
                     * @type {string}
                     * @desc changePassword URL
                     */
                    this.changePassword = config.resources.authentication.POST.changePassword.href || '';
                    /**
                     * @public
                     * @type {string}
                     * @desc Supported by Server API versions array for changePassword request
                     */
                    this.changePasswordServerApiVersions = config.resources.authentication.POST.changePassword.responseTypes || '';
                }
            }
        }

        this.userId = this.userId || '';
        this.email = this.email || '';
        this.firstName = this.firstName || '';
        this.lastName = this.lastName || '';
        this.multitenant = this.multitenant || '';
        this.iwaEnabled = this.iwaEnabled || '';
        this.linkToWindowsClient = this.linkToWindowsClient || '';
        this.linkToMacClient = this.linkToMacClient || '';
        this.getUserDetails = this.getUserDetails || '';
        this.addUpdateUserPreferences = this.addUpdateUserPreferences || '';
        this.changePassword = this.changePassword || '';
    }

    AvayaUserClient.Config.Resources = Resources;
})(AvayaUserClient);

/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */

(function(AvayaUserClient) {
    'use strict';

    /**
     * AvayaUserClient.Base.Logger
     * This class do nothing and represented only for documentation purposes
     * By default Service use window.console logger
     * If specific Logger object is needed it should be implemented in scope of
     * {@link AvayaUserClient.Config} and should be passed to
     * {Avaya User Client} constructor directly
     * @class
     * @constructor
     * @public
     * @memberOf AvayaUserClient.Config
     * @define AvayaUserClient.Config.Logger
     */
    function Logger() {}

    /**
     * @function AvayaUserClient.Config.Logger#log
     * @memberOf AvayaUserClient.Config.Logger
     * @desc Logs data to console
     * @public
     * @abstract
     */
    Logger.prototype.log = function() {};

    /**
     * @function AvayaUserClient.Config.Logger#info
     * @memberOf AvayaUserClient.Config.Logger
     * @desc Logs data to console with 'info' label
     * @public
     * @abstract
     */
    Logger.prototype.info = function() {};

    /**
     * @function AvayaUserClient.Config.Logger#info
     * @memberOf AvayaUserClient.Config.Logger
     * @desc Logs data to console with 'warn' label
     * @public
     * @abstract
     */
    Logger.prototype.warn = function() {};

    /**
     * @function AvayaUserClient.Config.Logger#info
     * @memberOf AvayaUserClient.Config.Logger
     * @desc Logs data to console with 'error' label
     * @public
     * @abstract
     */
    Logger.prototype.error = function() {};

    /**
     * @function AvayaUserClient.Config.Logger#info
     * @memberOf AvayaUserClient.Config.Logger
     * @desc Logs data to console with 'debug' label
     * @public
     * @abstract
     */
    Logger.prototype.debug = function() {};

    AvayaUserClient.Config.Logger = Logger;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.RequestBuilder
     * @classdesc REST server-side API layer for UPS Portal server
     * @private
     * @memberOf AvayaUserClient.Providers
     * @define AvayaUserClient.Providers.PortalProvider
     */
    function PortalProvider() {
        AvayaUserClient.Base.Providers.RequestBuilder.call(this);
    }

    PortalProvider.prototype = Object.create(AvayaUserClient.Base.Providers.RequestBuilder.prototype);

    /**
     * @function AvayaUserClient.Providers.PortalProvider#getUserDetails
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Get User Details
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.getUserDetails = function (opts) {
        aucLogger.log('AvayaUserClient.Providers.PortalProvider.getUserDetails: %o', opts);

        var serverRequest = this.send(opts),
        self = this;

        var convertResponseToObject = serverRequest.then(function (response) {
                var userConfig = self.convertUserDetailsToSdkObject(response);
                var res = new AvayaUserClient.Base.Responses.QueryConfigResponse('OK', userConfig);

                return $.Deferred().resolve(res).promise();
            });

        return $.when(convertResponseToObject, serverRequest);
    };

    /**
     * @function AvayaUserClient.Providers.PortalProvider#updateUserDetails
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Update user config
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.updateUserDetails = function (opts) {
        aucLogger.log('AvayaUserClient.Providers.PortalProvider.updateUserDetails: %o', opts);
        var usedApiVersion = (this.checkVersion(this.resources.addUpdateUserPreferencesServerApiVersions) === 2) ? AvayaUserClient.Constants.CONTENT_TYPES.SCHEDULE_UPDATEv2 : AvayaUserClient.Constants.CONTENT_TYPES.UPDATE;
            opts.headers = {
                'Content-Type' : ["application/json"],
                'Accept' : ["application/json"]
            };
        opts.data = this.convertUserDetailsToServerObject(opts.data);

        return this.send(opts);
    };

    /**
     * @function AvayaUserClient.Providers.PortalProvider#postChangePassword
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc send change password request
     * @private
     * @param {Object} opts - jQuery ajax options
     * @param {boolean} isGuest - forgot password
     * @param userName
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.postChangePassword = function (opts, isGuest, userName) {
        var Base64 = {

            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (input)
            {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length)
                {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2))
                    {
                        enc3 = enc4 = 64;
                    }
                    else if (isNaN(chr3))
                    {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                } // Whend

                return output;
            },
            decode: function (input)
            {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length)
                {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 !== 64)
                    {
                        output = output + String.fromCharCode(chr2);
                    }

                    if (enc4 !== 64)
                    {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;
            }, //private methods
            _utf8_encode: function (string)
            {
                var utftext = "";
                string = string.replace(/\r\n/g, "\n");

                for (var n = 0; n < string.length; n++)
                {
                    var c = string.charCodeAt(n);

                    if (c < 128)
                    {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 127) && (c < 2048))
                    {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else
                    {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },
            _utf8_decode: function (utftext)
            {
                var string = "";
                var i = 0;
                var c, c1, c2, c3;
                c = c1 = c2 = 0;

                while (i < utftext.length)
                {
                    c = utftext.charCodeAt(i);

                    if (c < 128)
                    {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if ((c > 191) && (c < 224))
                    {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else
                    {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }
        };

        aucLogger.log('AvayaUserClient.Providers.PortalProvider.postChangePassword: %o', opts);
        var data;
        if (opts.data){
            data = JSON.parse(opts.data);
        }
        var newPass = data ? data.newPassword : undefined;
        if (isGuest) {
            opts.headers = {
                'Content-Type' : ['application/vnd.avaya.portal.authentication.password.change.v2+json'],
                'X-UnifiedPortal' : Base64.encode(":" + newPass)
            };
        } else {
            var oldPass = data ? data.password : undefined;
            opts.headers = {
                'Content-Type' : ['application/vnd.avaya.portal.authentication.password.change.v2+json'],
                'Authorization' : "UnifiedPortal " + Base64.encode(userName + ":" + oldPass),
                'X-UnifiedPortal' : Base64.encode(userName + ":" + newPass)
            };
        }

        var newData = JSON.parse(opts.data);
        delete newData.password;
        delete newData.newPassword;
        opts.data = JSON.stringify(newData);
        return this.send(opts, false, true);
    };

    /**
     * @function AvayaUserClient.Providers.PortalProvider#postPictureRequest
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Upload picture for user
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.postPictureRequest = function (opts) {
        opts.headers = {
            'Accept' : [AvayaUserClient.Constants.CONTENT_TYPES.PICTURE, AvayaUserClient.Constants.CONTENT_TYPES.ERROR]
        };
        aucLogger.log('AvayaUserClient.Providers.PortalProvider.postPictureRequest: %o', opts);
        return this.send(opts);
    };

    /**
     * @function AvayaUserClient.Providers.PortalProvider#deletePictureRequest
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Delete picture for user
     * @private
     * @param {Object} opts - jQuery ajax options
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    PortalProvider.prototype.deletePictureRequest = function (opts) {
        aucLogger.log('AvayaUserClient.Providers.PortalProvider.deletePictureRequest: %o', opts);
        return this.send(opts);
    };


    /**
     * @function AvayaUserClient.Providers.PortalProvider#checkVersion
     * @memberOf AvayaUserClient.Providers.PortalProvider
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
     * @function AvayaUserClient.Providers.PortalProvider#checkVersion
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Removes added in V2 API fields
     * @private
     * @param {Object} userDetails
     * @returns {AvayaUserClient.UserService.UserDetails}
     */
    PortalProvider.prototype.fallbackToV1 = function (userDetails) {
        delete userDetails._voicePromptLanguage;
    };

    /**
     * @function AvayaUserClient.Providers.PortalProvider#convertUserDetailsToServerObject
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Intend is converting object to exact server format. More comlex convertation can be implemented here if needed
     * @private
     * @param {AvayaUserClient.UserService.UserDetails} userDetails - SDK object
     * @returns {Object}
     */
    PortalProvider.prototype.convertUserDetailsToServerObject = function (userDetails) {
        aucLogger.debug('AvayaUserClient.Providers.PortalProvider.convertUserDetailsToServerObject in: %o', userDetails);

        var virtualRooms = userDetails.virtualRoomSettings;

        for (var i = 0; i < virtualRooms.length; i++) {
            virtualRooms[i]._default = virtualRooms[i]._defaultRoom;
            delete virtualRooms[i]._defaultRoom;
            virtualRooms[i]._public = virtualRooms[i]._publicRoom;
            delete virtualRooms[i]._publicRoom;

            if (virtualRooms[i]._oneTimePINRequired === true){
                delete virtualRooms[i]._accessPIN;
            }
        }

        // API versioning conversion
        var highestSupportedVersion = 1;
        if (this.resources.getUserDetailsServerApiVersions){
            highestSupportedVersion = this.checkVersion(this.resources.getUserDetailsServerApiVersions);
        }

        switch (highestSupportedVersion) {
            case 1 : this.fallbackToV1(userDetails); break;
            case 2 : break;
            default: this.fallbackToV1(userDetails);
        }

        var serverObject = JSON.stringify(userDetails).replace(/"_([0-9a-zA-Z-_]+)"/g, '"$1"')
            .replace(/"validator":\{\},/g, '');

        return serverObject;
    };

    /**
     * @function AvayaUserClient.Providers.PortalProvider#convertUserDetailsToSdkObject
     * @memberOf AvayaUserClient.Providers.PortalProvider
     * @desc Convert response object back to SDK object
     * @private
     * @param {Object} userDetails - JSON object from server
     * @returns {AvayaUserClient.UserService.UserDetails}
     */
    PortalProvider.prototype.convertUserDetailsToSdkObject = function (userDetails) {
        aucLogger.debug('AvayaUserClient.Providers.PortalProvider.convertUserDetailsToSdkObject:in: %o', userDetails);

        // XML lib returns object with all keys started with uppercase, switch to lower.
        /*userDetails = JSON.stringify(userDetails).replace(/"(\w+)"\s*:/g, function (x, y) {
        return '"' + y.charAt(0).toLowerCase() + y.slice(1) + '"';
        });*/

        //userDetails = JSON.parse(userDetails);

        var virtualRooms = userDetails.conferencing.virtualRoomSettings;

        for (var i = 0; i < virtualRooms.length; i++) {
            virtualRooms[i].defaultRoom = virtualRooms[i]["default"];
            virtualRooms[i].publicRoom = virtualRooms[i]["public"];
        }

        userDetails.conferencing.virtualRoomSettings = virtualRooms;

        var sdkObject = new AvayaUserClient.UserService.UserDetails(userDetails);
        aucLogger.debug('AvayaUserClient.Providers.PortalProvider.convertUserDetailsToSdkObject:out: %o', sdkObject);
        return sdkObject;
    };

    AvayaUserClient.Providers.PortalProvider = PortalProvider;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Providers.PortalProvider
     * @classdesc SDK API layer. Main implementation class for User Service
     * @private
     * @memberOf AvayaUserClient.Providers
     * @define AvayaUserClient.Providers.UserProvider
     */
    function UserProvider() {

        AvayaUserClient.Providers.PortalProvider.call(this);

        /**
         * @private
         * @type {AvayaUserClient.Providers.Validators}
         * @desc Assign custom Validator to Provider
         */
        this._validator = new AvayaUserClient.Providers.Validators.PlainValidator();
    }

    UserProvider.prototype = Object.create(AvayaUserClient.Providers.PortalProvider.prototype);

    /**
     * @function AvayaUserClient.Providers.UserProvider#getUserConfig
     * @memberOf AvayaUserClient.Providers.UserProvider
     * @desc Get user config
     * @private
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserProvider.prototype.getUserConfig = function () {
        aucLogger.log('AvayaUserClient.Providers.UserProvider.getUserConfig');
        var opts = {};
        opts.headers = {
            'Accept' : [AvayaUserClient.Constants.CONTENT_TYPES.FETCHv2, AvayaUserClient.Constants.CONTENT_TYPES.FETCH, AvayaUserClient.Constants.CONTENT_TYPES.ERROR]
        };
        opts.url = this.resources.getUserDetails;
        opts.method = 'GET';

        return this.getUserDetails(opts);
    };

    /**
     * @function AvayaUserClient.Providers.UserProvider#updateUserConfig
     * @memberOf AvayaUserClient.Providers.UserProvider
     * @desc Update user config
     * @private
     * @param {AvayaUserClient.UserService.UserDetailsUpdate} userDetailsUpdate
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserProvider.prototype.updateUserConfig = function (userDetailsUpdate) {
        aucLogger.log('AvayaUserClient.Providers.UserProvider.updateUserConfig: %o', userDetailsUpdate);
        var opts = {},
        validateResponse = userDetailsUpdate.validate();

        if (validateResponse.success) {
            opts.data = userDetailsUpdate;

            opts.url = this.resources.addUpdateUserPreferences;
            opts.method = 'POST';

            return this.updateUserDetails(opts);
        } else {
            return this._validator.errorInvalidObject(validateResponse);
        }
    };

    /**
     * @function AvayaUserClient.Providers.UserProvider#changePassword
     * @memberOf AvayaUserClient.Providers.UserProvider
     * @desc Change Password
     * @private
     * @param {string} password
     * @param {string} confirmationToken - should be null for that provider
     * @param {string} newPassword
     * @param userName
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserProvider.prototype.changePassword = function (password, confirmationToken, newPassword, userName) {
        aucLogger.log('AvayaUserClient.Providers.UserProvider.changePassword: %s %s', password, newPassword);
        var opts = {};

        opts.data = JSON.stringify({
            password : password,
            confirmationToken : confirmationToken,
            newPassword : newPassword
        });

        opts.url = this.resources.changePassword;
        opts.method = 'POST';

        return this.postChangePassword(opts, undefined, userName);
    };

    /**
     * @function AvayaUserClient.Providers.UserProvider#postPicture
     * @memberOf AvayaUserClient.Providers.UserProvider
     * @desc Upload picture for user
     * @private
     * @param {file} file
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserProvider.prototype.postPicture = function (file) {
        var formData = new FormData();
        formData.append('image', file);

        var opts = {
            url : this.resources.postPictureUrl,
            method : 'POST',
            data : formData,
            contentType : false,
            processData : false
        };

        return this.postPictureRequest(opts);
    };

    /**
     * @function AvayaUserClient.Providers.UserProvider#deletePicture
     * @memberOf AvayaUserClient.Providers.UserProvider
     * @desc Delete picture for user
     * @private
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    UserProvider.prototype.deletePicture = function () {
        var opts = {
            url : this.resources.deletePictureUrl,
            method : 'DELETE',
            headers : []
        };

        return this.deletePictureRequest(opts);
    };

    /**
     * @function AvayaUserClient.Providers.UserProvider#getPicture
     * @memberOf AvayaUserClient.Providers.UserProvider
     * @desc Get picture for user
     * @private
     * @returns {string} picture URL
     */
    UserProvider.prototype.getPicture = function () {
        return this.resources.getPictureUrl;
    };

    AvayaUserClient.Providers.UserProvider = UserProvider;
})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Providers.PortalProvider
     * @classdesc SDK API layer. Implementation for unauthorized guest user
     * @private
     * @memberOf AvayaUserClient.Providers
     * @define AvayaUserClient.Providers.GuestProvider
     */
    function GuestProvider() {

        AvayaUserClient.Providers.PortalProvider.call(this);

        /**
         * @private
         * @type {AvayaUserClient.Providers.Validators}
         * @desc Assign custom Validator to Provider
         */
        this._validator = new AvayaUserClient.Providers.Validators.PlainValidator();
    }

    GuestProvider.prototype = Object.create(AvayaUserClient.Providers.PortalProvider.prototype);

    /**
     * @function AvayaUserClient.Providers.GuestProvider#changePassword
     * @memberOf AvayaUserClient.Providers.GuestProvider
     * @desc Change Password using temporarily token (Forgot password feature)
     * @private
     * @param {string} password - should be null for that provider
     * @param {string} confirmationToken
     * @param {string} newPassword
     * @returns {AvayaUserClient.Base.Responses.Promise}
     */
    GuestProvider.prototype.changePassword = function (password, confirmationToken, newPassword, userName, changePasswordHref) {
        aucLogger.log('AvayaUserClient.Providers.GuestProvider.changePassword: %s %s', confirmationToken);
        var opts = {};

        opts.data = JSON.stringify({
            confirmationToken : confirmationToken,
            newPassword : newPassword
        });

        opts.headers = {
            'Content-Type' : ['application/vnd.avaya.portal.authentication.password.change.v2+json']
        };
        opts.url = changePasswordHref;
        opts.method = 'POST';

        return this.postChangePassword(opts, true);
    };

    AvayaUserClient.Providers.GuestProvider = GuestProvider;
})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.UserDetailsValidator
     */
    function UserDetailsValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    UserDetailsValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.UserDetailsValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.UserDetailsValidator
     * @desc Validate UserDetails object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails} userDetails
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    UserDetailsValidator.prototype.validateObject = function(userDetails) {
        var errors = [];

        if (!this.validate(userDetails.givenName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('givenName');
        }

        if (!this.validate(userDetails.surname, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('surname');
        }

        if (!this.validate(userDetails.nativeGivenName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('nativeGivenName');
        }

        if (!this.validate(userDetails.nativeSurname, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('nativeSurname');
        }

        if (!this.validate(userDetails.displayName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('displayName');
        }

        if (!this.validate(userDetails.userId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }

        if (!this.validate(userDetails.userTimeZone, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('userTimeZone');
        }

        if (!this.validate(userDetails.officePhoneNumber, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('officePhoneNumber');
        }

        if (!this.validate(userDetails.language, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('language');
        }

        if (!this.validate(userDetails.pictureUrl, AvayaUserClient.Constants.CONDITIONS.URL)) {
            errors.push('pictureUrl');
        }

        var conferencingRes = userDetails.conferencing.validate();
        if (!conferencingRes.success) {
            errors.push(conferencingRes.errors);
        }

        var preferences = userDetails.preferences;
        if (!Array.isArray(preferences)) {
            errors.push('preferences: is not an array');
        } else {
            for (var i = 0; i < preferences.length; i++) {
                if (!this.validate(preferences, AvayaUserClient.Constants.CONDITIONS.STRING)) {
                    errors.push('preferences[' + i + ']: invalid data');
                }
            }
        }

        var handles = userDetails.handles;
        if (!Array.isArray(handles)) {
            errors.push('handles: is not an array');
        } else {
            for (var k = 0; k < handles.length; k++) {
                var res = handles[k].validate();
                if (!res.success) {
                    errors.push('handles[' + k + ']:' + res.errors);
                }
            }
        }

        var mobilePhoneNumbers = userDetails.mobilePhoneNumbers;
        if (!Array.isArray(mobilePhoneNumbers)) {
            errors.push('mobilePhoneNumbers: is not an array');
        } else {
            for (var j = 0; j < mobilePhoneNumbers.length; j++) {
                if (!this.validate(mobilePhoneNumbers, AvayaUserClient.Constants.CONDITIONS.STRING)) {
                    errors.push('mobilePhoneNumbers[' + j + ']: invalid data');
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.UserDetailsValidator = UserDetailsValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetailsUpdate} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.UserDetailsUpdateValidator
     */
    function UserDetailsUpdateValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    UserDetailsUpdateValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.UserDetailsUpdateValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.UserDetailsUpdateValidator
     * @desc Validate UserDetailsUpdate object
     * @private
     * @param {AvayaUserClient.UserService.UserDetailsUpdate} userDetailsUpdate
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    UserDetailsUpdateValidator.prototype.validateObject = function(userDetailsUpdate) {
        var errors = [];

        if (!this.validate(userDetailsUpdate.locationId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('locationId');
        }

        if (!this.validate(userDetailsUpdate.userTimeZone, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('userTimeZone');
        }

        if (!this.validate(userDetailsUpdate.defaultVirtualRoom, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('defaultVirtualRoom');
        }

        var preferences = userDetailsUpdate.preferences;
        if (!Array.isArray(preferences)) {
            errors.push('preferences: is not an array');
        } else {
            for (var i = 0; i < preferences.length; i++) {
                if (!this.validate(preferences, AvayaUserClient.Constants.CONDITIONS.STRING)) {
                    errors.push('preferences[' + i + ']: invalid data');
                }
            }
        }

        var virtualRoomSettings = userDetailsUpdate.virtualRoomSettings;
        if (!Array.isArray(virtualRoomSettings)) {
            errors.push('virtualRoomSettings: is not an array');
        } else {
            for (var j = 0; j < virtualRoomSettings.length; j++) {
                var res = virtualRoomSettings[j].validate();
                if (!res.success) {
                    errors.push('virtualRoomSettings[' + j + ']:' + res.errors);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.UserDetailsUpdateValidator = UserDetailsUpdateValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.AdvancedPropertiesValidator
     */
    function AdvancedPropertiesValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    AdvancedPropertiesValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.AdvancedPropertiesValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.AdvancedPropertiesValidator
     * @desc Validate AdvancedProperties object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.AdvancedProperties} advancedProperties
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    AdvancedPropertiesValidator.prototype.validateObject = function(advancedProperties) {
        var errors = [];

        if (!this.validate(advancedProperties.durationAfterLeft, AvayaUserClient.Constants.CONDITIONS.MEETING_DURATION)) {
            errors.push('durationAfterLeft');
        }
        if (!this.validate(advancedProperties.terminationCondition, AvayaUserClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION)) {
            errors.push('terminationCondition');
        }
        if (!this.validate(advancedProperties.maxParticipants, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxParticipants');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.AdvancedPropertiesValidator = AdvancedPropertiesValidator;

})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.AttendeeValidator
     */
    function AttendeeValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    AttendeeValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.AttendeeValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.AttendeeValidator
     * @desc Validate Attendee object with nested validation of all nested objects
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.Attendee} attendee
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    AttendeeValidator.prototype.validateObject = function (attendee) {
        var errors = [];

        if (!this.validate(attendee.terminalId, AvayaUserClient.Constants.CONDITIONS.STRING, true)) {
            errors.push('terminalId');
        }
        if (attendee.protocol && !this.validate(attendee.protocol, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('protocol');
        }
        if (!this.validate(attendee.terminalName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('terminalName');
        }
        if (!this.validate(attendee.terminalNumber, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('terminalNumber');
        }
        if (!this.validate(attendee.maxBandwidth, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxBandwidth');
        }
        if (!this.validate(attendee.maxISDNBandwidth, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxISDNBandwidth');
        }
        if (!this.validate(attendee.areaCode, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('areaCode');
        }
        if (!this.validate(attendee.countryCode, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('countryCode');
        }
        if (!this.validate(attendee.telephoneNumber, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('telephoneNumber');
        }
        if (!this.validate(attendee.restrictedMode, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('restrictedMode');
        }
        if (!this.validate(attendee.threeG, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('threeG');
        }
        if (!this.validate(attendee.voiceOnly, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('voiceOnly');
        }
        if (!this.validate(attendee.userId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }
        if (!this.validate(attendee.firstName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('firstName');
        }
        if (!this.validate(attendee.lastName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('lastName');
        }
        if (!this.validate(attendee.email, AvayaUserClient.Constants.CONDITIONS.EMAIL)) {
            errors.push('email');
        }
        if (!this.validate(attendee.organizer, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('organizer');
        }
        if (!this.validate(attendee.host, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('host');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.AttendeeValidator = AttendeeValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.ConferencingValidator
     */
    function ConferencingValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    ConferencingValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.ConferencingValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.ConferencingValidator
     * @desc Validate Conferencing object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing} conferencing
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    ConferencingValidator.prototype.validateObject = function(conferencing) {
        var errors = [], result;

        if (!this.validate(conferencing.localUser, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('localUser');
        }

        if (!this.validate(conferencing.scopiaUserId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('scopiaUserId');
        }

        if (!this.validate(conferencing.scopiaMemberId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('scopiaMemberId');
        }

        if (!this.validate(conferencing.defaultTerminalId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('defaultTerminalId');
        }

        if (!this.validate(conferencing.defaultTerminalNumber, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('defaultTerminalNumber');
        }

        if (!this.validate(conferencing.defaultVirtualRoom, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('defaultVirtualRoom');
        }

        if (!this.validate(conferencing.maxBandWidth, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxBandWidth');
        }

        if (!this.validate(conferencing.recordingPolicy, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('recordingPolicy');
        }

        if (!this.validate(conferencing.locationId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('locationId');
        }

        if (!this.validate(conferencing.schedulable, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('schedulable');
        }

        if (!this.validate(conferencing.participantId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('participantId');
        }

        if (!this.validate(conferencing.reservable, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('reservable');
        }

        if (!this.validate(conferencing.allowStreaming, AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowStreaming');
        }

        if (!this.validate(conferencing.allowRecording, AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowRecording');
        }

        if (!this.validate(conferencing.allowUseOthersVirtualRoom, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowUseOthersVirtualRoom');
        }
        if (!this.validate(conferencing.canScheduleEventConference, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('canScheduleEventConference');
        }

        var propositionalRes = conferencing.propositional.validate();
        if (!propositionalRes.success) {
            errors.push(propositionalRes.errors);
        }

        var virtualRoomSettings = conferencing.virtualRoomSettings;
        if (!Array.isArray(virtualRoomSettings)) {
            errors.push('virtualRoomSettings: is not an array');
        } else {
            for (var i = 0; i < virtualRoomSettings.length; i++) {
                var res = virtualRoomSettings[i].validate();
                if (!res.success) {
                    errors.push('virtualRoomSettings[' + i + ']:' + res.errors);
                }
            }
        }

        var meetingServiceList = conferencing.meetingServiceList;
        if (!Array.isArray(meetingServiceList)) {
            errors.push('meetingServiceList: is not an array');
        } else {
            for (var j = 0; j < meetingServiceList.length; j++) {
                result = meetingServiceList[j].validate();
                if (!result.success) {
                    errors.push('meetingServiceList[' + j + ']:' + result.errors);
                }
            }
        }

        var availableVoicePromptLanguages = conferencing.availableVoicePromptLanguages;
        if (!Array.isArray(availableVoicePromptLanguages)) {
            errors.push('availableVoicePromptLanguages: is not an array');
        } else {
            for (var o = 0; o < availableVoicePromptLanguages.length; o++) {
                result = availableVoicePromptLanguages[o].validate();
                if (!result.success) {
                    errors.push('availableVoicePromptLanguages[' + o + ']:' + result.errors);
                }
            }
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.ConferencingValidator = ConferencingValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Handle} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.HandleValidator
     */
    function HandleValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    HandleValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.HandleValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.HandleValidator
     * @desc Validate Handle object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Handle} handle
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    HandleValidator.prototype.validateObject = function(handle) {
        var errors = [];

        if (!this.validate(handle.address, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('address');
        }
        if (!this.validate(handle.type, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('type');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.HandleValidator = HandleValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.VoicePromptLanguage} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator
     */
    function VoicePromptLanguageValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    VoicePromptLanguageValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator
     * @desc Validate VoicePromptLanguage object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.VoicePromptLanguage} voicePromptLanguage
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    VoicePromptLanguageValidator.prototype.validateObject = function(voicePromptLanguage) {
        var errors = [];

        if (!this.validate(voicePromptLanguage.id, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(voicePromptLanguage.displayName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push(displayName);
        }
        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator = VoicePromptLanguageValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.AvailableDialInLocations} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.AvailableDialInLocationsValidator
     */
    function AvailableDialInLocationsValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    AvailableDialInLocationsValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.AvailableDialInLocationsValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.AvailableDialInLocationsValidator
     * @desc Validate AvailableDialInLocations object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.AvailableDialInLocations} AvailableDialInLocations
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    AvailableDialInLocationsValidator.prototype.validateObject = function(availableDialInLocations) {
        var errors = [];

        if (!this.validate(availableDialInLocations.id, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(availableDialInLocations.displayName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('displayName');
        }
        if (!this.validate(availableDialInLocations.id, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('label');
        }
        if (!this.validate(availableDialInLocations.displayName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('number');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.AvailableDialInLocationsValidator = AvailableDialInLocationsValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.VoicePromptLanguage} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator
     */
    function InvitationLanguageValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    InvitationLanguageValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.VoicePromptLanguageValidator
     * @desc Validate VoicePromptLanguage object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.VoicePromptLanguage} voicePromptLanguage
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    InvitationLanguageValidator.prototype.validateObject = function(invitationLanguages) {
        var errors = [];

        if (!this.validate(invitationLanguages.id, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('id');
        }
        if (!this.validate(invitationLanguages.displayName, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push(displayName);
        }
        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.InvitationLanguageValidator = InvitationLanguageValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.DelegatedUsers} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.DelegatedUsersValidator
     */
    function DelegatedUsersValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    DelegatedUsersValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.DelegatedUsersValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.DelegatedUsersValidator
     * @desc Validate DelegatedUsers object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.DelegatedUsers} delegatedUser
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    DelegatedUsersValidator.prototype.validateObject = function(delegatedUser) {
        var errors = [];
        if (!this.validate(delegatedUser.userId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('userId');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.DelegatedUsersValidator = DelegatedUsersValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.ReservedPortsValidator
     */
    function ReservedPortsValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    ReservedPortsValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.ReservedPortsValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.ReservedPortsValidator
     * @desc Validate ReservedPorts object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup.ReservedPorts} reservedPorts
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    ReservedPortsValidator.prototype.validateObject = function(reservedPorts) {
        var errors = [];

        if (!this.validate(reservedPorts.regular, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('regular');
        }
        if (!this.validate(reservedPorts.sd, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('sd');
        }
        if (!this.validate(reservedPorts.hd, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('hd');
        }
        if (!this.validate(reservedPorts.fullHD, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('fullHD');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.ReservedPortsValidator = ReservedPortsValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.UserGroupValidator
     */
    function UserGroupValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    UserGroupValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.UserGroupValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.UserGroupValidator
     * @desc Validate UserGroup object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.UserGroup} userGroup
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    UserGroupValidator.prototype.validateObject = function(userGroup) {
        var errors = [];

        if (!this.validate(userGroup.groupId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('groupId');
        }
        if (!this.validate(userGroup.name, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.UserGroupValidator = UserGroupValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.VirtualRoomSetupValidator
     */
    function VirtualRoomSetupValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    VirtualRoomSetupValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.VirtualRoomSetupValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.VirtualRoomSetupValidator
     * @desc Validate VirtualRoomSetup object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.VirtualRoomSetup} virtualRoomSetup
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    VirtualRoomSetupValidator.prototype.validateObject = function(virtualRoomSetup) {
        var errors = [];

        if (!this.validate(virtualRoomSetup.memberId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('memberId');
        }
        if (!this.validate(virtualRoomSetup.virtualRoomId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('virtualRoomId');
        }
        if (!this.validate(virtualRoomSetup.number, AvayaUserClient.Constants.CONDITIONS.NUMBER, true)) {
            errors.push('number');
        }
        if (!this.validate(virtualRoomSetup.accessPIN, AvayaUserClient.Constants.CONDITIONS.BASE64)) {
            errors.push('accessPIN');
        }
        if (!this.validate(virtualRoomSetup.moderatorPIN, AvayaUserClient.Constants.CONDITIONS.BASE64)) {
            errors.push('moderatorPIN');
        }
        if (!this.validate(virtualRoomSetup.serviceTemplateId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('serviceTemplateId');
        }
        if (!this.validate(virtualRoomSetup.servicePrefix, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('servicePrefix');
        }
        if (!this.validate(virtualRoomSetup.priority, AvayaUserClient.Constants.CONDITIONS.MEETING_PRIORITY)) {
            errors.push('priority');
        }
        if (!this.validate(virtualRoomSetup.protectMeetingWithParticipantId, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('protectMeetingWithParticipantId');
        }
        if (!this.validate(virtualRoomSetup.allowStreaming, AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowStreaming');
        }
        if (!this.validate(virtualRoomSetup.allowRecording, AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('allowRecording');
        }

        if (!this.validate(virtualRoomSetup.streamingStatus, AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED)) {
            errors.push('streamingStatus');
        }

        var attendees = virtualRoomSetup.attendees;
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

        var reservedPortsRes = virtualRoomSetup.reservedPorts.validate();
        if (!reservedPortsRes.success) {
            errors.push(reservedPortsRes.errors);
        }

        if (!this.validate(virtualRoomSetup.blockDialIn, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('blockDialIn');
        }
        if (!this.validate(virtualRoomSetup.autoExtend, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('autoExtend');
        }
        if (!this.validate(virtualRoomSetup.waitingRoom, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('waitingRoom');
        }

        var advancedPropertiesRes = virtualRoomSetup.advancedProperties.validate();
        if (!advancedPropertiesRes.success) {
            errors.push(advancedPropertiesRes.errors);
        }

        if (!this.validate(virtualRoomSetup.oneTimePINRequired, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('oneTimePINRequired');
        }
        if (!this.validate(virtualRoomSetup.name, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(virtualRoomSetup.defaultRoom, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('defaultRoom');
        }
        if (!this.validate(virtualRoomSetup.publicRoom, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('publicRoom');
        }
        if (!this.validate(virtualRoomSetup.maxParticipants, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxParticipants');
        }
        if (!this.validate(virtualRoomSetup.maxRoomParticipants, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxRoomParticipants');
        }
        if (!this.validate(virtualRoomSetup.allowKnocking, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowKnocking');
        }
        if (!this.validate(virtualRoomSetup.allowInstantMeeting, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('allowInstantMeeting');
        }
        if (!this.validate(virtualRoomSetup.invitationLanguage, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('invitationLanguage');
        }
        if (!this.validate(virtualRoomSetup.voicePromptLanguage, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('voicePromptLanguage');
        }
        if (!this.validate(virtualRoomSetup.entryAnnouncement, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('entryAnnouncement');
        }
        if (!this.validate(virtualRoomSetup.exitAnnouncement, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('exitAnnouncement');
        }
        if (!this.validate(virtualRoomSetup.maxPlayToneNumber, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxPlayToneNumber');
        }
        if (!this.validate(virtualRoomSetup.maxPlayNameNumber, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('maxPlayNameNumber');
        }
        if (!this.validate(virtualRoomSetup.allowPresentPolicy, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('allowPresentPolicy');
        }


        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.VirtualRoomSetupValidator = VirtualRoomSetupValidator;

})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.Propositional} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.PropositionalValidator
     */
    function PropositionalValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    PropositionalValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.PropositionalValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.PropositionalValidator
     * @desc Validate Propositional object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.Propositional} propositional
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    PropositionalValidator.prototype.validateObject = function (propositional) {
        var errors = [];

        if (!this.validate(propositional.number, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('number');
        }

        if (!this.validate(propositional.virtualMeetingIDPrefix, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('virtualMeetingIDPrefix');
        }

        if (!this.validate(propositional.minimumMeetingIDLength, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('minimumMeetingIDLength');
        }

        if (!this.validate(propositional.defaultDuration, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('defaultDuration');
        }

        if (!this.validate(propositional.defaultDialMode, AvayaUserClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE)) {
            errors.push('defaultDialMode');
        }

        if (!this.validate(propositional.termination, AvayaUserClient.Constants.CONDITIONS.TERMINATION)) {
            errors.push('termination');
        }

        if (!this.validate(propositional.terminationTime, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('terminationTime');
        }

        if (!this.validate(propositional.showEndTimeReplaceDuration, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('showEndTimeReplaceDuration');
        }
        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.PropositionalValidator = PropositionalValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Providers.Validators
     * @classdesc Custom implementation for non object validations
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.PlainValidator
     */
    function PlainValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    PlainValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    AvayaUserClient.Providers.Validators.PlainValidator = PlainValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.MeetingServiceValidator
     */
    function MeetingServiceValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    MeetingServiceValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.MeetingServiceValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.MeetingServiceValidator
     * @desc Validate MeetingService object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService} MeetingService
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    MeetingServiceValidator.prototype.validateObject = function(meetingService) {
        var errors = [];

        if (!this.validate(meetingService.default, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('default');
        }
        if (!this.validate(meetingService.description, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('description');
        }
        if (!this.validate(meetingService.mediaProperty, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('mediaProperty');
        }
        if (!this.validate(meetingService.name, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('name');
        }
        if (!this.validate(meetingService.prefix, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('prefix');
        }
        if (!this.validate(meetingService.serviceId, AvayaUserClient.Constants.CONDITIONS.STRING)) {
            errors.push('serviceId');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.MeetingServiceValidator = MeetingServiceValidator;

})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @class
     * @constructor
     * @extends AvayaUserClient.Base.Providers.Validator
     * @classdesc Custom Validator implementation for {@link AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout} object
     * @private
     * @memberOf AvayaUserClient.Providers.Validators
     * @define AvayaUserClient.Providers.Validators.VideoLayoutValidator
     */
    function VideoLayoutValidator() {
        AvayaUserClient.Base.Providers.Validator.call(this);
    }

    VideoLayoutValidator.prototype = Object.create(AvayaUserClient.Base.Providers.Validator.prototype);

    /**
     * @function AvayaUserClient.Providers.Validators.MeetingServiceValidator#validateObject
     * @memberOf AvayaUserClient.Providers.Validators.MeetingServiceValidator
     * @desc Validate VideoLayout object
     * @private
     * @param {AvayaUserClient.UserService.UserDetails.Conferencing.MeetingService.VideoLayout} videoLayout
     * @returns {AvayaUserClient.Base.Responses.ObjectValidation}
     */
    VideoLayoutValidator.prototype.validateObject = function (videoLayout) {
        var errors = [];

        if (!this.validate(videoLayout.layoutName, AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME)) {
            errors.push('layoutName');
        }
        if (!this.validate(videoLayout.layoutType, AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE)) {
            errors.push('layoutType');
        }
        if (!this.validate(videoLayout.dynamic, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('dynamic');
        }
        if (!this.validate(videoLayout.noSelfSee, AvayaUserClient.Constants.CONDITIONS.BOOLEAN)) {
            errors.push('noSelfSee');
        }
        if (!this.validate(videoLayout.layoutMax, AvayaUserClient.Constants.CONDITIONS.NUMBER)) {
            errors.push('layoutMax');
        }

        return this.buildValidationResponse(errors);
    };

    AvayaUserClient.Providers.Validators.VideoLayoutValidator = VideoLayoutValidator;

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants
     * @define AvayaUserClient.Constants.CONDITIONS
     */
    AvayaUserClient.Constants.CONDITIONS = AvayaUserClient.Constants.CONDITIONS || {};

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants
     * @define AvayaUserClient.Constants.CONTENT_TYPES
     */
    AvayaUserClient.Constants.CONTENT_TYPES = AvayaUserClient.Constants.CONTENT_TYPES || {};

})(AvayaUserClient);

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

(function (AvayaUserClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONTENT_TYPES
     * @define AvayaUserClient.Constants.CONTENT_TYPES.CHANGE_PASS
     */
    AvayaUserClient.Constants.CONTENT_TYPES.CHANGE_PASS = 'application/vnd.avaya.acs.userdetails.changepass.v1+json';
    AvayaUserClient.Constants.CONTENT_TYPES.CHANGE_PASSv2 = 'application/vnd.avaya.acs.userdetails.changepass.v2+json';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONTENT_TYPES
     * @define AvayaUserClient.Constants.CONTENT_TYPES.UPDATE
     */
    AvayaUserClient.Constants.CONTENT_TYPES.UPDATE = 'application/vnd.avaya.acs.userdetails.v1+json';
    AvayaUserClient.Constants.CONTENT_TYPES.UPDATEv2 = 'application/vnd.avaya.acs.userdetails.v2+json';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONTENT_TYPES
     * @define AvayaUserClient.Constants.CONTENT_TYPES.FETCH
     */
    AvayaUserClient.Constants.CONTENT_TYPES.FETCH = 'application/vnd.avaya.acs.userdetails.v1+json';
    AvayaUserClient.Constants.CONTENT_TYPES.FETCHv2 = 'application/vnd.avaya.acs.userdetails.v2+json';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONTENT_TYPES
     * @define AvayaUserClient.Constants.CONTENT_TYPES.ERROR
     */
    AvayaUserClient.Constants.CONTENT_TYPES.ERROR = 'application/vnd.avaya.csa.error.v1+json';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONTENT_TYPES
     * @define AvayaUserClient.Constants.CONTENT_TYPES.PICTURE
     */
    AvayaUserClient.Constants.CONTENT_TYPES.PICTURE = 'application/vnd.avaya.acs.pictureservice.v1+json';

})(AvayaUserClient);

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

(function(AvayaUserClient) {
    'use strict';

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.NUMBER
     */
    AvayaUserClient.Constants.CONDITIONS.NUMBER = /^[-]{0,1}[0-9]+$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.STRING
     */
    AvayaUserClient.Constants.CONDITIONS.STRING = /^.*$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.ID
     */
    AvayaUserClient.Constants.CONDITIONS.ID = /^[0-9]{1,32}$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.BOOLEAN
     */
    AvayaUserClient.Constants.CONDITIONS.BOOLEAN = /^(TRUE)|(FALSE)$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.EMAIL
     */
    AvayaUserClient.Constants.CONDITIONS.EMAIL = /.+@.+\..+/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.URL
     */
    AvayaUserClient.Constants.CONDITIONS.URL = /^http[s]{0,1}:\/\/.*\..+$/i;

    /**
     * @constant
     * @desc Format: YYYY-MM-DDThh:mm:ss+hh:mm, not ideal, probably need to extend
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.TIME_UTC
     */
    AvayaUserClient.Constants.CONDITIONS.TIME_UTC = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.DATE
     */
    AvayaUserClient.Constants.CONDITIONS.DATE = /^\d\d\d\d-\d\d-\d\d$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.TIME_ZONE
     */
    AvayaUserClient.Constants.CONDITIONS.TIME_ZONE = /^[+-]\d\d:\d\d$/;

    /**
     * @constant
     * @desc Empty string is valid for that rule
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.BASE64
     */
    AvayaUserClient.Constants.CONDITIONS.BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED
     */
    AvayaUserClient.Constants.CONDITIONS.ON_OFF_DISABLED = /^ON$|^OFF$|^DISABLED$|^UNDEFINED$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.DAY_OF_WEEK
     */
    AvayaUserClient.Constants.CONDITIONS.DAY_OF_WEEK = /^MON$|^TUE$|^WED$|^THU$|^FRI$|^SAT$|^SUN$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.WEEK_OF_MONTH
     */
    AvayaUserClient.Constants.CONDITIONS.WEEK_OF_MONTH = /^FIRST$|^SECOND$|^THIRD$|^FOURTH$|^LATEST$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.MEETING_DURATION
     */
    AvayaUserClient.Constants.CONDITIONS.MEETING_DURATION = /^P(\d+Y){0,1}(\d+M){0,1}(\d+D){0,1}T(\d+H){0,1}(\d+M){0,1}([0-9.]+S){0,1}$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.MEETING_PRIORITY
     */
    AvayaUserClient.Constants.CONDITIONS.MEETING_PRIORITY = /^DELAY$|^LOCAL$|^UNSPECIFIED$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL
     */
    AvayaUserClient.Constants.CONDITIONS.ATTENDEE_PROTOCOL = /^H323$|^ISDN$|^SIP$|^DUAL$|^MOBILE$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION
     */
    AvayaUserClient.Constants.CONDITIONS.ADVANCED_PROPERTIES_TERMINATION_CONDITION = /^NORMAL$|^AFTER_ALL_PARTIES_LEFT$|^AFTER_HOST_LEFT$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE
     */
    AvayaUserClient.Constants.CONDITIONS.DEFAULT_DIAL_MODE = /^DIAL_OUT$|^DIAL_IN$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.TERMINATION
     */
    AvayaUserClient.Constants.CONDITIONS.TERMINATION = /^SCHEDULE_END_TIME$|^ALL_ENDPOINT_LEFT$/i;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME
     */
    AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_NAME = /^MAIN$|^CUSTOMER$/;

    /**
     * @constant
     * @memberOf AvayaUserClient.Constants.CONDITIONS
     * @define AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE
     */
    AvayaUserClient.Constants.CONDITIONS.VIDEO_LAYOUT_TYPE =  /^0000$|^0100$|^0201$|^0202$|^0207$|^0302$|^0303$|^0400$|^0401$|^0402$|^0501$|^0600$|^0601$|^0705$|^0801$|^0900$|^0901$|^1001$|^1200$|^1301$|^1305$|^1600$|^2100$|^2101$|^2800$/i;
   //Full list //^0000$|^0100$|^0201$|^0202$|^0203$|^0204$|^0205$|^0206$|^0207$|^0302$|^0303$|^0400$|^0401$|^0402$|^0501$|^0600$|^0601$|^0602$|^0603$|^0705$|^0706$|^0801$|^0802$|^0900$|^0901$|^0902$|^1001$|^1002$|^1003$|^1004$|^1200$|^1301$|^1302$|^1303$|^1304$|^1305$|^1600$|^2100$|^2101$|^2800$/i;

})(AvayaUserClient);
