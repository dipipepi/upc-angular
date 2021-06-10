(function($, window, AvayaRecordingClient) {

    'use strict';

    var resources,
        sessionId,
        service,
        logger,
        resultContainer,
        categories,
        timeFormat = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };


    $(document).ready(function() {
        logger = logWidget();
        clientConfig.logger = logger;

        createNewAvayaRecordingClient();

        resultContainer = $('#search-results');

        $('.button-collapse').sideNav();
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({
            delay: 50
        });

        $('.nav-wrapper li').not('li:has( a.modal-trigger)').on('click', function(event) {
            $(this).parent().children('li').removeClass('active');
            $(this).addClass('active');

            $('.content').removeClass('active');
            $('#' + $(this).data().activates).addClass('active');
        });

        function bindInputWithProperty(inputId, changeCallback, obj, field, type) {
            var jqInput = $(inputId),
                fieldValue = obj[field];
            if (jqInput.prop('type') === 'text') {
                jqInput.val(fieldValue);
                if (fieldValue !== "") {
                    $('[for="' + inputId + '"]').addClass('active');
                } else {
                    $('[for="' + inputId + '"]').removeClass('active');
                }
            } else if (jqInput.prop('type') === 'checkbox') {
                jqInput.prop('checked', fieldValue);
            } else if (jqInput.is('select')) {
                if (type === 'number') {
                    fieldValue = fieldValue.toString();
                }
                $(inputId + ' option[value="' + fieldValue + '"]').prop('selected', true);
            } else if (jqInput.prop('type') === 'datetime-local') {
                $(inputId).prop('valueAsNumber', fieldValue);
            }
            if (obj && field) {
                $(inputId).on('change', function() {
                    changeCallback.call(this, obj, field);
                });
            }
        }

        function updateProperty(obj, property) {
            obj[property] = $(this).val();
            if ($(this).prop('type') === 'checkbox') {
                obj[property] = $(this).prop('checked');
            }
            if ($(this).prop('type') === 'datetime-local') {
                var date = new Date($(this).prop('valueAsNumber'))
                obj[property] = date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            }
        }

        function updateClientProperty(obj, property) {
            obj[property] = $(this).val();
            createNewAvayaRecordingClient();
        }

        bindInputWithProperty('#credentials-host', updateClientProperty, clientConfig.authServer, 'host');
        bindInputWithProperty('#credentials-port', updateClientProperty, clientConfig.authServer, 'port');
        bindInputWithProperty('#acsr-url', updateClientProperty, clientConfig.serviceServer.resources, 'baseUrl');
        bindInputWithProperty('#programs-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'programsUrl');
        bindInputWithProperty('#categories-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'categoriesUrl');
        bindInputWithProperty('#templates-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'templatesUrl');
        bindInputWithProperty('#reports-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'reportsUrl');
        bindInputWithProperty('#credentials-tenant', updateClientProperty, credentials, 'organizationAlias');
        bindInputWithProperty('#credentials-login', updateClientProperty, credentials, 'login');
        bindInputWithProperty('#credentials-password', updateClientProperty, credentials, 'password');

        $('a[href^="#test"]').on('click', function(event) {
            $('[id^="test"]' + ' > div').remove();
            $('div' + this.hash).prepend(function() {
                if (!resources) {
                    return '<div class="col s12"><div class="z-depth-1 white">CONFIGURATION is not set!</div></div>'
                }
                var htmlString = '<div class="col s12">' +
                    '<div class="z-depth-1 white">',
                    self = this;
                clientParams.category.value = undefined;
                for (var key in clientParams) {
                    var adding = false,
                        field = '';
                    clientParams[key].visibility.forEach(function(element) {
                        if ($(self).attr('data-program-test') === element || element === 'ALL') {
                            adding = true;
                        }
                    });

                    if (clientParams[key].values) {
                        var options = '<option value="" selected>none</option>';
                        clientParams[key].values.forEach(function(option) {

                            if (option instanceof Object) {
                                options += '<option value="' + option.id + '">' + option.name + '</option>'
                            } else {
                                options += '<option value="' + option + '">' + option + '</option>'
                            }
                        });

                        field = '<div class="input-field col s12">' +
                            '<label for="' + key + '" class="active">' + clientParams[key].label + '</label>' +
                            '<div class="s12">' +
                            '<select class="browser-default" id="' + key + '' + '">' + options +
                            '</select></div></div>';

                    } else {
                        field = '<div class="input-field col s12">' +
                            '<input class="tooltipped" id="' + key + '" type="' + (clientParams[key].type || (typeof clientParams[key].value === 'boolean' ? 'checkbox' : 'text')) +
                            '" data-position="right"' + 'data-tooltip="' + clientParams[key].tooltip + '">' +
                            '<label for="' + key + '" class="' + (clientParams[key].value !== undefined ? 'active' : '') + '">' + clientParams[key].label + '</label>' +
                            '</div>';
                    }

                    if (adding) {
                        clientParams[key].enabled = true;
                        htmlString += field;
                    } else {
                        clientParams[key].enabled = false;
                    }
                }
                htmlString += '</div></div>';
                return htmlString;
            });

            for (var key in clientParams) {
                bindInputWithProperty('#' + key, updateProperty, clientParams[key], 'value');
            }
            $('.tooltipped').tooltip({
                delay: 50
            });

            $('div.input-field:has([id="tenantId"])').hide();
            $('div.input-field:has([id="user"])').hide();
        });

        $('#upload-input').on('change', function(e) {
            var fileReader = new FileReader();
            fileReader.onloadend = function(data) {
                logger.log('Applying config from file...');
                var parsedConfig = JSON.parse(data.target.result);
                uploadConfig(parsedConfig);
                createNewAvayaRecordingClient();
                $('#modalSettings').closeModal();

            };
            fileReader.readAsText(e.target.files[0]);

            function uploadConfig(parsedConfig) {
                clientConfig.authServer.host = parsedConfig.host;
                clientConfig.authServer.port = parsedConfig.port;
                clientConfig.serviceServer.resources.baseUrl = parsedConfig.baseUrl;
                clientConfig.serviceServer.resources.programResources.programsUrl = parsedConfig.programsUrl;
                clientConfig.serviceServer.resources.programResources.categoriesUrl = parsedConfig.categoriesUrl;
                clientConfig.serviceServer.resources.programResources.templatesUrl = parsedConfig.templatesUrl;
                clientConfig.serviceServer.resources.programResources.reportsUrl = parsedConfig.reportsUrl;
                credentials.organizationAlias = parsedConfig.organizationAlias;
                credentials.login = parsedConfig.login;
                credentials.password = parsedConfig.password;

                bindInputWithProperty('#credentials-host', updateClientProperty, clientConfig.authServer, 'host');
                bindInputWithProperty('#credentials-port', updateClientProperty, clientConfig.authServer, 'port');
                bindInputWithProperty('#acsr-url', updateClientProperty, clientConfig.serviceServer.resources, 'baseUrl');
                bindInputWithProperty('#programs-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'programsUrl');
                bindInputWithProperty('#categories-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'categoriesUrl');
                bindInputWithProperty('#templates-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'templatesUrl');
                bindInputWithProperty('#reports-url', updateClientProperty, clientConfig.serviceServer.resources.programResources, 'reportsUrl');
                bindInputWithProperty('#credentials-tenant', updateClientProperty, credentials, 'organizationAlias');
                bindInputWithProperty('#credentials-login', updateClientProperty, credentials, 'login');
                bindInputWithProperty('#credentials-password', updateClientProperty, credentials, 'password');

                logger.log('Configuration has been applied.');
            }
        });

        $(window).on('scroll', function(event) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > $('.content.active').height() - $('.result-block').height()/2) {
                return;
            } else if (scrolled > 130) {
                $('.result-block').css('margin-top', (-123 + scrolled) + 'px');
            } else {
                $('.result-block').css('margin-top', '0.5rem');
            }
        });


    });

    var client,
        credentials = {
            login: '',
            password: '',
            organizationAlias: ''
        },
        clientParams = {
            tenantId: {
                value: credentials.tenantCode,
                label: 'Filter programs by tenant',
                tooltip: 'Filter programs by tenant. This parameter is implicit in the authentication token. A tenant other than that of the authenticated user may be specified, in which case results will be limited to public recordings within that tenant.',
                visibility: ['ALL'],
                enabled: true
            },
            user: {
                value: undefined,
                label: 'Logged user',
                tooltip: ' Filter programs by logged user.',
                visibility: ['ALL'],
                enabled: true
            },
            programId: {
                value: undefined,
                label: 'program ID',
                tooltip: 'The unique ID of the program',
                visibility: ['INDIVIDUAL', 'PLAY_REPORT', 'STATE', 'EDIT', 'CHAT_SESSIONS', 'CHAT_SEND', 'CHAT_SESSION', 'CHAT_CREATE_SESSION', 'CHAT_ASK_SEND', 'REPORTS_SINGLE', 'REPORTS_VIEWERS'],
                enabled: false
            },
            programPassword: {
                value: undefined,
                label: 'program\'s password',
                tooltip: 'program\'s PIN/password',
                visibility: ['INDIVIDUAL'],
                enabled: false
            },
            templateId: {
                value: undefined,
                label: 'template ID',
                tooltip: ' ID of the template.',
                visibility: ['TEMPLATE'],
                enabled: false
            },
            query: {
                value: undefined,
                label: 'Search query',
                tooltip: 'Search query. Matches:name, description',
                visibility: ['VOD', 'LIVE'],
                enabled: true
            },
            offset: {
                value: 0,
                label: 'Paging offset',
                tooltip: 'Paging offset. Defaults to 0',
                visibility: ['VOD', 'LIVE', 'CATEGORY_ALL', 'CATEGORY', 'PUBLISHER', 'REPORTS', 'REPORTS_SINGLE'],
                enabled: true
            },
            count: {
                value: 20,
                label: 'Paging count',
                tooltip: 'Number of results to return. Defaults to 20',
                visibility: ['VOD', 'LIVE','CATEGORY_ALL', 'CATEGORY', 'PUBLISHER', 'REPORTS', 'REPORTS_SINGLE'],
                enabled: true
            },
            orderBy: {
                value: undefined,
                label: 'Sort order',
                tooltip: 'Sort order.',
                visibility: ['VOD', 'LIVE'],
                enabled: true
            },
            orderBy2: {
                value: undefined,
                label: 'Sort order2',
                tooltip: 'Second sort order. "orderBy" must be present if using this field.',
                visibility: ['VOD', 'LIVE'],
                enabled: true
            },
            category: {
                value: undefined,
                values: categories,
                label: 'Filter category',
                tooltip: 'Filter programs by category.',
                visibility: ['VOD', 'CATEGORY', 'EDIT'],
                enabled: true
            },
            ownerId: {
                value: undefined,
                label: 'Owner Id',
                tooltip: 'Filter programs by user',
                visibility: ['VOD', 'LIVE', 'PUBLISHER'],
                enabled: true
            },
            timezoneOffset: {
                value: new Date().getTimezoneOffset(),
                label: 'Timezone offset',
                tooltip: 'The timezone offset for the client, specified as the number of minutes that need to be added to the client\'s time to align it with UTC',
                visibility: ['LIVE'],
                enabled: true
            },
            dnId: {
                value: undefined,
                label: 'dnId',
                tooltip: 'Id of the Distribution Node used for playback. It filled automatically after Program\'s playback details request',
                visibility: ['PLAY_REPORT'],
                enabled: true
            },
            reportId: {
                value: undefined,
                label: 'report Id',
                tooltip: 'Unique ID of report. It filled automatically after start report request',
                visibility: ['PLAY_REPORT'],
                enabled: true
            },
            conferenceAddress: {
                value: undefined,
                label: 'Filter by the  address of the conference',
                tooltip: 'Filter the programs by the  address of the conference (e.g. meeting room ID) from which it was recorded.',
                visibility: ['LIVE'],
                enabled: true
            },
            onlyDeleted: {
                value: false,
                label: 'Only deleted',
                tooltip: 'Only include deleted programs (recycle bin) in results. Defaults to false.',
                visibility: ['VOD', 'PUBLISHER'],
                enabled: true
            },
            includeDeleted: {
                value: false,
                label: 'include deleted',
                tooltip: 'Include deleted programs (recycle bin) in results. Defaults to false.',
                visibility: ['VOD', 'PUBLISHER'],
                enabled: true
            },
            //Edit program parameters
            name: {
                value: undefined,
                label: 'name',
                tooltip: '',
                visibility: ['EDIT'],
                enabled: true
            },
            description: {
                value: undefined,
                label: 'description',
                tooltip: '',
                visibility: ['EDIT'],
                enabled: true
            },
            password: {
                value: undefined,
                label: 'PIN  access',
                tooltip: '',
                visibility: ['EDIT'],
                enabled: true
            },
            allowMediaDownload: {
                value: false,
                label: 'allow Media Download',
                tooltip: '',
                visibility: ['EDIT'],
                enabled: true
            },
            public: {
                value: false,
                label: 'show publicly in portal',
                tooltip: '',
                visibility: ['EDIT'],
                enabled: true
            },
            accessMode: {
                value: undefined,
                values: ['PRIVATE', 'USER_LIST', 'ALL_USERS', 'PUBLIC'],
                label: 'access mode',
                tooltip: '',
                visibility: ['EDIT'],
                enabled: true
            },
            //Chat parameters
            moderatorPin: {
                value: undefined,
                label: 'moderatorPin',
                tooltip: 'Moderator pin for the program if the user is not the conference owner',
                visibility: ['CHAT_SESSIONS', 'CHAT_SEND', 'CHAT_SESSION'],
                enabled: true
            },
            chatTimestamp: {
                value: 0,
                label: 'After this time',
                tooltip: 'Only include messages which arrived after this timestamp (milliseconds since epoch GMT).',
                visibility: ['CHAT_SESSIONS', 'CHAT_SESSION'],
                enabled: true,
                type: 'datetime-local'
            },
            sender: {
                val: undefined,
                get value() {
                    return this.val ? this.val : resources.self.firstName + ' ' + resources.self.lastName;
                },
                set value(val) {
                    this.val = val;
                },
                label: 'Sender name',
                tooltip: 'Display Name for sender',
                visibility: ['CHAT_SEND', 'CHAT_CREATE_SESSION', 'CHAT_ASK_SEND'],
                enabled: true
            },
            message: {
                value: undefined,
                label: 'Message',
                tooltip: 'Message that will send',
                visibility: ['CHAT_SEND', 'CHAT_ASK_SEND'],
                enabled: true
            },
            sessionId: {
                value: undefined,
                label: 'session Id',
                tooltip: '',
                visibility: ['CHAT_SEND', 'CHAT_ASK_SEND', 'CHAT_SESSION'],
                enabled: true
            },
            //Access report
            categoryName: {
                value: undefined,
                label: 'Filter category',
                tooltip: 'Filter programs by category.',
                visibility: ['REPORTS'],
                enabled: true
            },
            ownerName: {
                value: undefined,
                label: 'Owner name',
                tooltip: 'Filter by the name of the owner of the program. Only tenant administrator and administrators can specify an owner name other than their own. Defaults to the name of the user whose credentials were used to access the API.',
                visibility: ['REPORTS'],
                enabled: true
            },
            programName: {
                value: undefined,
                label: 'Program name',
                tooltip: 'Filter results to only programs whose name contain this string.',
                visibility: ['REPORTS'],
                enabled: true
            },
            range: {
                value: undefined,
                values: ['LAST_DAY', 'LAST_WEEK', 'LAST_MONTH', 'LAST_THREE_MONTHS', 'LAST_SIX_MONTHS', 'LAST_YEAR', 'ALL'],
                label: 'Time range',
                tooltip: 'Filter results to only show views in the speicfied time range.  Overrides startDate and endDate.',
                visibility: ['REPORTS', 'REPORTS_SINGLE'],
                enabled: true
            },
            startDate: {
                value: undefined,
                label: 'Start Date',
                tooltip: 'Filter results to only show views that started after this time. Ignored if a range is specifed.',
                visibility: ['REPORTS', 'REPORTS_SINGLE'],
                enabled: true,
                type: 'datetime-local'
            },
            endDate: {
                value: undefined,
                label: 'End Date',
                tooltip: 'Filter results to only show views that ended before this time. Ignored if a range is specifed.',
                visibility: ['REPORTS', 'REPORTS_SINGLE'],
                enabled: true,
                type: 'datetime-local'
            },
            userAgent: {
                value: undefined,
                label: 'User Agent',
                tooltip: 'Filter results to only views whose user agent string contains this string',
                visibility: ['REPORTS', 'REPORTS_SINGLE'],
                enabled: true
            },
            dnName: {
                value: undefined,
                label: 'DN name',
                tooltip: 'Filter results to only views where the DN used for playback had a name containing this string',
                visibility: ['REPORTS', 'REPORTS_SINGLE'],
                enabled: true
            },
            dnAddress: {
                value: undefined,
                label: 'DN address',
                tooltip: 'Filter results to only views where the DN used for playback had an address containing this string',
                visibility: ['REPORTS', 'REPORTS_SINGLE'],
                enabled: true
            },





            //            deleteResources: {value: true, label: 'Search query', tooltip: 'Defaults to true. If true, media associated with the program will be deleted in addition to the Program'},
            //            permanent: {value: false, label: 'Search query', tooltip: 'Defaults to false. If false, and the program is a recording, the recording is place in the recycle bin. Otherwise it is permanently deleted.'},

        };

    var authResources = new AvayaRecordingClient.Config.Resources.AuthorizationResources();

    var programResources = new AvayaRecordingClient.Config.Resources.ProgramResources();

    var authServer = new AvayaRecordingClient.Config.ServerInfo({
        host: '',
        port: '',
        isSecure: true,
        resources: authResources
    });

    var serviceServer = new AvayaRecordingClient.Config.ServerInfo({
        resources: {
            baseUrl: '',
            programResources: programResources
        }
    });

    var clientConfig = {
        authServer: authServer,
        serviceServer: serviceServer,
        logger: logger
    };

    function createNewAvayaRecordingClient() {
        logger.log('Avaya Recording Client updated with new parameters');
        clientConfig = {
            authServer: authServer,
            serviceServer: serviceServer,
            logger: logger
        };
        fetchResources().then(function() {
            client = new AvayaRecordingClient(clientConfig);
        });
    }

    function createAvayaRecordingProgramParams(params) {
        var recordingParams = {};
        for (var key in params) {
            if (params[key].enabled) {
                recordingParams[key] = params[key].value;
            }
        }
        recordingParams = new AvayaRecordingClient.Services.ProgramService.ProgramParams(recordingParams);
        return recordingParams;
    }

    function createProgramFromParams(params) {
        var diff = {};
        for (var key in params) {
            if (params[key].visibility.indexOf('EDIT') !== -1) {
                diff[key] = params[key].value;
            }
        }
        diff = new AvayaRecordingClient.Services.ProgramService.Program(diff);
        return diff;
    }

    function createAvayaRecordingChatParams(params) {
        var chatParams = {};
        for (var key in params) {
            if (params[key].enabled) {
                chatParams[key] = params[key].value;
            }
        }
        chatParams = new AvayaRecordingClient.Services.ChatService.ChatParams(chatParams);
        return chatParams;
    }

    function getAvayaRecordingReportParams(params) {
        var reportParams = {};
        for (var key in params) {
            if (params[key].enabled) {
                if (key === 'categoryName') {
                    reportParams['category'] = params[key].value;
                    continue;
                }
                reportParams[key] = params[key].value;
            }
        }
        return reportParams;
    }

    function showResult(response) {
        resultContainer.empty();
        if (response instanceof Array) {
            response.forEach(function(item, index) {
                var li = $('<li/>');
                li.html('<div class="toggle-icon plus"></div><div class="item toggle-item">' + JSON.stringify(item)
                    .replace(/_(\w+)/g, '$1')
                    .replace(/"(\w+)"/g, function(x, y) {
                        return '"' + y.charAt(0).toUpperCase() + y.slice(1) + '"';
                    })
                    .replace(/"validator":\{\},/ig, '')
                    .replace(/\"(\w+)\":\{\},/g, '')
                    .replace(/\"(\w+)\":\[\],/g, '')
                    .replace(/\"(\w+)\":\"\",/g, '')
                    .replace(/,\"/g, ",\n\"")
                    .replace(/\"(\w+)\":/g, '<b>$1: </b>')
                    .replace(/^\{/ig, '')
                    .replace(/\}$/ig, '')+'</div>');
                if (index % 2) {
                    li.addClass('odd');
                }
                li.on('click', function(){
                    $(this).children('.toggle-icon').toggleClass('plus')
                    $(this).children('.item').toggleClass('toggle-item');
                })
                resultContainer.append(li);

            });
            if (response.length == 0) {
                var li = $('<li/>');
                li.html('<h5>No results were found</h5>');
                resultContainer.append(li);
            }
        } else if (response) {
            var li = $('<li/>');
            li.html('<div class="item">' + JSON.stringify(response)
                .replace(/_(\w+)/g, '$1')
                .replace(/"(\w+)"/g, function(x, y) {
                    return '"' + y.charAt(0).toUpperCase() + y.slice(1) + '"';
                })
                .replace(/"validator":\{\},/ig, '')
                .replace(/,\"/g, ",\n\"")
                .replace(/\"(\w+)\":/g, '<b>$1: </b>')
                .replace(/^\{/ig, '')
                .replace(/\}$/ig, '') + '</div>');
            resultContainer.append(li);
        } else {
            var li = $('<li/>');
            li.html('<h5>No results were found</h5>');
            resultContainer.append(li);
        }
    }

    function login() {
        logger.log('Login request. START');
        if (!window.localStorage) {
            Materialize.toast($('<span class="error">Browser does not support localStorage.</span>'), 10000, 'teal lighten-5');
            logger.warn('Browser does not support localStorage.');
            return;
        }

        function onFetchGuestResourcesSuccess() {
            logger.log('Guest resources are fetched');

            function onLoginSuccess(response) {
                logger.log('User is logged in, Token received');
                window.localStorage.setItem('UPS_TOKEN', response.token);
                logger.log('UPS token has been added to localStorage');

                client.authenticationService.login(response.token).done(function(res, res2) {
                    logger.log('ACSR token request return success');
                    Materialize.toast('ACSR Authentication Service: login!', 5000, 'teal darken-4');
                    $('li[data-activates="authentication"] a i').toggleClass('authorized');
                }).fail(function() {

                });

                logger.log('Login request. STEP 3: Getting user (by token) resources.');
                return fetchResources(response.token).then(
                    function(response) {
                        logger.log('Get resources request success');
                        resources = response;
                        clientParams.user.value = response.self.userId;
                        return httpConnectionService().get(undefined, response.resources.middleware.POST.createSession.href).then(function(session) {
                            sessionId = session.sessionId;
                            return response;
                        });
                    },
                    function(response) {
                        logger.warn('Get resources request fail, response=%o', response);
                        return $.Deferred().reject(response);
                    }

                );
            }

            function onLoginError(response) {
                logger.log('User is not logged in');
                return $.Deferred().reject(response);
            }

            logger.log('Login request. STEP 2: User login request.');
            return httpConnectionService().post(undefined, resources.resources.authentication.POST.login.href, credentials ? JSON.stringify(credentials) : null)
                .then(onLoginSuccess, onLoginError);
        }

        function onFetchResourcesError(fetchResourcesResponse) {
            logger.warn("User resources request failed, login rejected");
            return $.Deferred().reject(fetchResourcesResponse);
        }

        logger.log('Login request. STEP 1: Getting guest resources.');
        return fetchResources().then(onFetchGuestResourcesSuccess, onFetchResourcesError);
    }

    function fetchResources(token) {
        if (!authServer.host || !authServer.port || !credentials.organizationAlias) {
            logger.error('CONFIGURATION is not set!');
        }
        var resourcesUrl = 'https://' + authServer.host + ':' + authServer.port + '/ups/resources/tenants/' + credentials.organizationAlias + '/';
        return httpConnectionService().get(token, resourcesUrl).then(
            function(response) {
                logger.log('Get resources request success');
                resources = response;
                clientParams.tenantId.value = response.self.scopiaMemberId;
                authResources.authorizationUrl = response.resources.authentication.POST.contentServerToken.href;
                return httpConnectionService().get(undefined, response.resources.middleware.POST.createSession.href).then(function(session) {
                    sessionId = session.sessionId;
                    return response;
                });
            },
            function(response) {
                logger.warn('Get resources request fail, response=%o', response);
                return $.Deferred().reject(response);
            }
        );
    }

    function logout() {
        client.authenticationService.logout().done(function(res, res2) {
            logger.log('RecordingService: logout: %o : %o', res, res2);
            clientParams.user.value = undefined;
            Materialize.toast($('<span class="error">ACSR Authentication Service: logout!.</span>'), 5000, 'left teal lighten-5');
        }).fail(function(res) {
            logger.warn('RecordingService: logout fail. Response=%o', res);

        });
    }

    function isLogged() {
        logger.log('RecordingService: isLogged = ' + client.authenticationService.isLoggedIn());
    }

    function getVodRecords() {
        client.programService.getRecordedPrograms(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getRecordedPrograms: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            console.error('getRecordedPrograms: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getRecordsByCategory() {
        client.programService.getRecordedProgramsByCategory(clientParams.category.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            console.log('getRecordsByCategory: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            console.error('getRecordsByCategory: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getRecordsByPublisher() {
        client.programService.getRecordedProgramsByPublisher(clientParams.category.ownerId, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            console.log('getRecordsByCategory: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            console.error('getRecordsByCategory: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getAllCategories() {
        client.programService.getAllCategories(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getAllCategories: %o', response);
            showResult(response.response.categories);
            categories = response.response.categories;
            clientParams.category.values = categories;
        }).fail(function(response) {
            logger.error('getAllCategories: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getCategory() {
        client.programService.getCategory(clientParams.category.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getCategory: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('getCategory: %o', response);
        });
    }

    function getIndividualProgram() {
        client.programService.getProgram(clientParams.programId.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getIndividualProgram: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('getIndividualProgram: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getAllBroadcasts() {
        client.programService.getAllBroadcasts(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getAllBroadcasts: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            logger.error('getAllBroadcasts: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getFutureLiveBroadcasts() {
        client.programService.getFutureLiveBroadcasts(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getFutureLiveBroadcasts: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            logger.error('getFutureLiveBroadcasts: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getTodayBroadcasts() {
        client.programService.getTodayBroadcasts(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getTodayBroadcasts: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            logger.error('getTodayBroadcasts: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getOngoingBroadcasts() {
        client.programService.getOngoingBroadcasts(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getOngoingBroadcasts: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            logger.error('getOngoingBroadcasts: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getProgramPlaybackAddressDetails() {
        client.programService.getProgramPlaybackAddressDetails(clientParams.programId.value,
            clientParams.programPassword.value,
            createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getProgramPlaybackAddressDetails: %o', response);
            showResult(response.response);
            clientParams.dnId.value = response.response.reportUrl.split('=')[1];
        }).fail(function(response) {
            logger.error('getProgramPlaybackAddressDetails: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getPasswordProtectedProgram() {
        client.programService.getPasswordProtectedProgram(clientParams.programId.value,
            clientParams.programPassword.value,
            createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getPasswordProtectedProgram: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('getPasswordProtectedProgram: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function reportProgramView() {
        client.programService.reportProgramView(clientParams.programId.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('reportProgramView: %o', response);
            showResult({
                reportId: response.response
            });
            clientParams.reportId.value = response.response;
        }).fail(function(response) {
            logger.error('reportProgramView: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function reportEndProgramView() {
        client.programService.reportEndProgramView(clientParams.programId.value, clientParams.reportId.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('reportEndProgramView: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('reportEndProgramView: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getProgramStatus() {
        client.programService.getProgramStatus(clientParams.programId.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getProgramStatus: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('getProgramStatus: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getAllTemplates() {
        client.programService.getAllTemplates(createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getAllTemplates: %o', response);
            showResult(response.pagedList.items);
        }).fail(function(response) {
            logger.error('getAllTemplates: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getIndividualTemplate() {
        client.programService.getTemplate(clientParams.templateId.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('getIndividualTemplate: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('getIndividualTemplate: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function deleteProgram() {
        client.programService.deleteProgram(clientParams.programId.value, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('deleteProgram: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('deleteProgram: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function recoverProgram() {
        var diff = new AvayaRecordingClient.Services.ProgramService.Program();
        diff.deleted = false;
        client.programService.updateProgram(clientParams.programId.value, diff, createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('recoverProgram: ' + response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('recoverProgram:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function editProgram() {
        client.programService.updateProgram(clientParams.programId.value, createProgramFromParams(clientParams), createAvayaRecordingProgramParams(clientParams)).done(function(response) {
            logger.log('editProgram: ' + response);
            showResult(response.response);
        }).fail(function(response) {
            logger.error('editProgram:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function fetchChatSessions() {
        client.chatService.getSessions(clientParams.programId.value, createAvayaRecordingChatParams(clientParams)).done(function(response) {
            logger.log('fetchChatSessions: ' + response);
            var results = [],
                result;
            response.response.sessions.forEach(function(session) {
                result = {
                    sessionId: session.sessionId,
                    initiatorName: session.initiatorName,
                    lastMessageTime: new Date(session.lastMessageTime).toLocaleTimeString('en-US', timeFormat),
                    initiatorAuthenticated: session.initiatorAuthenticated,
                    unansweredCount: session.unansweredCount,
                }
                results.push(result);
            });
            showResult(results);
        }).fail(function(response) {
            logger.error('fetchChatSessions:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getSession() {
        client.chatService.getSession(clientParams.programId.value, clientParams.sessionId.value, createAvayaRecordingChatParams(clientParams)).done(function(response) {
            logger.log('getSession: ' + response);
            var results = [],
                result;
            response.response.messages.forEach(function(session) {
                result = {
                    type: session.type + ' from  ' + decodeURIComponent(session.senderDisplayName) + ',  at ' + new Date(session.timestamp).toLocaleTimeString('en-US', timeFormat),
                    message: session.message,
                }
                results.push(result);
            });
            showResult(results);
        }).fail(function(response) {
            logger.error('getSession:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function answerForMessage() {
        var msg = new AvayaRecordingClient.Services.ChatService.ChatMessage();
        msg.message = clientParams.message.value;
        msg.sender = resources.self.firstName ? resources.self.firstName + ' ' + resources.self.lastName : clientParams.sender.value;
        msg.type = 'RESPONSE';
        client.chatService.postMessage(msg, clientParams.programId.value, clientParams.sessionId.value, createAvayaRecordingChatParams(clientParams)).done(function(response) {
            logger.log('answerForMessage: ' + response);
            showResult(response);
        }).fail(function(response) {
            logger.error('answerForMessage:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function createNewSession() {
        clientParams.sender.value = resources.self.firstName ? resources.self.firstName + ' ' + resources.self.lastName : clientParams.sender.value;
        client.chatService.createSession(clientParams.programId.value, createAvayaRecordingChatParams(clientParams)).done(function(response) {
            logger.log('createNewSession: ' + response);
            showResult(response);
            clientParams.sessionId.value = response.response.sessionId;
        }).fail(function(response) {
            logger.error('createNewSession:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function askQuestion() {
        var msg = new AvayaRecordingClient.Services.ChatService.ChatMessage();
        msg.message = clientParams.message.value;
        msg.sender = resources.self.firstName ? resources.self.firstName + ' ' + resources.self.lastName : clientParams.sender.value;
        msg.type = 'QUESTION';
        client.chatService.postMessage(msg, clientParams.programId.value, clientParams.sessionId.value, createAvayaRecordingChatParams(clientParams)).done(function(response) {
            logger.log('answerForMessage: ' + response);
            showResult(response);
        }).fail(function(response) {
            logger.error('answerForMessage:' + response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getSystemSettings() {
        var params = new AvayaRecordingClient.Services.SystemSettingsService.SystemSettingsParams({
            tenantId: clientParams.tenantId.value,
            user: clientParams.user.value,
        });
        if (resources.multitenant) {
            showResult({
                error: 'Request not available for multitenant configuration'
            });
            return;
        }

        client.systemSettingsService.getSystemSettings(params).done(function(response) {
            logger.log('getSystemSettings: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.log('getSystemSettings: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getIndividualTenant() {
        var params = new AvayaRecordingClient.Services.TenantService.TenantParams({
            tenantId: clientParams.tenantId.value,
            user: clientParams.user.value,
        });
        if (!resources.multitenant) {
            showResult({
                error: 'Request not available for enterprise configuration'
            });
            return;
        }

        client.tenantService.getIndividualTenant(clientParams.tenantId.value, params).done(function(response) {
            logger.log('getIndividualTenant: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.log('getIndividualTenant: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }




    function getProgramAccessReport() {
        var params = new AvayaRecordingClient.Services.ReportsService.AccessReportParams(getAvayaRecordingReportParams(clientParams));
        client.reportService.getProgramAccessReport(params).done(function(response) {
            logger.log('getProgramAccessReport: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.log('getProgramAccessReport: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getProgramAccessReportForProgram() {
        var params = new AvayaRecordingClient.Services.ReportsService.AccessReportParams(getAvayaRecordingReportParams(clientParams));
        client.reportService.getProgramAccessReportForProgram(clientParams.programId.value, params).done(function(response) {
            logger.log('getIndividualTenant: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.log('getIndividualTenant: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getProgramViewers() {
        var params = new AvayaRecordingClient.Services.ReportsService.AccessReportParams(getAvayaRecordingReportParams(clientParams));
        client.reportService.getProgramViewers(clientParams.programId.value, params).done(function(response) {
            logger.log('getIndividualTenant: %o', response);
            showResult(response.response);
        }).fail(function(response) {
            logger.log('getIndividualTenant: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    window.testApp = {
        login: login,
        logout: logout,
        isLogged: isLogged,
        fetchVodRecords: getVodRecords,
        getRecordsByCategory: getRecordsByCategory,
        getRecordsByPublisher: getRecordsByPublisher,
        getIndividualProgram: getIndividualProgram,
        getAllBroadcasts: getAllBroadcasts,
        getPasswordProtectedProgram: getPasswordProtectedProgram,
        getProgramPlaybackAddressDetails: getProgramPlaybackAddressDetails,
        getOngoingBroadcasts: getOngoingBroadcasts,
        getTodayBroadcasts: getTodayBroadcasts,
        getFutureLiveBroadcasts: getFutureLiveBroadcasts,
        reportProgramView: reportProgramView,
        reportEndProgramView: reportEndProgramView,
        getAllCategories: getAllCategories,
        getCategory: getCategory,
        getProgramStatus: getProgramStatus,
        getAllTemplates: getAllTemplates,
        getIndividualTemplate: getIndividualTemplate,
        deleteProgram: deleteProgram,
        recoverProgram: recoverProgram,
        editProgram: editProgram,
        fetchChatSessions: fetchChatSessions,
        answerForMessage: answerForMessage,
        askQuestion: askQuestion,
        getSession: getSession,
        createNewSession: createNewSession,
        getSystemSettings: getSystemSettings,
        getIndividualTenant: getIndividualTenant,
        getProgramAccessReport: getProgramAccessReport,
        getProgramAccessReportForProgram: getProgramAccessReportForProgram,
        getProgramViewers: getProgramViewers
    };

    /*


        var accessReportParams = new AvayaRecordingClient.Services.ReportsService.AccessReportParams({
            tenantId : '2001',
            rang : 'ALL'
        });

        client.reportService.getProgramAccessReport('b4f8bf90308d41d9b0d00fc22edfc1d2', accessReportParams);

        var accessReportOneProgramParams =  new AvayaRecordingClient.Services.ReportsService.AccessReportOneProgramParams({

        });

        client.reportService.getProgramAccessReportForProgram('b4f8bf90308d41d9b0d00fc22edfc1d2', accessReportOneProgramParams);

        client.reportService.getProgramViewers('b4f8bf90308d41d9b0d00fc22edfc1d2');*/



    function httpConnectionService() {

        function get(token, url, paramsObject) {
            return request('GET', url, null, paramsObject, token);
        }

        function post(token, url, dataObject, paramsObject, headers) {
            return request('POST', url, dataObject, paramsObject, token, headers);
        }

        function request(method, url, dataObject, paramsObject, token, headers) {
            var parameters = {
                method: method,
                url: url,
                data: dataObject,
                params: paramsObject,
                headers: headers || {
                    'Content-Type': 'application/json'
                }
            };
            if (token) {
                parameters.headers.Authorization = 'Bearer ' + token;
            }
            return $.ajax(parameters).then(
                function(response) {
                    return response;
                },
                function(response) {
                    return $.Deferred().reject(response);
                }
            );
        }

        return {
            get: get,
            post: post
        };
    }

    function logWidget() {
        var logMsgCounter = 0;
        var logContainer = $('#logs'),
            logMsgPrototype = $('#log-msg-prototype');

        function createLogMsgDOMElement(message, classType) {
            var logMsg = logMsgPrototype.clone();
            logMsg.removeAttr('id');
            logMsg.attr('id', 'log-msg-' + (++logMsgCounter));

            logMsg.find('.msg-text').text(message);
            logMsg.addClass(classType);

            var li = $('<li/>');
            li.append(logMsg);
            return li;
        }

        function log(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message, 'log'));
        }

        function warn(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message, 'warn'));
        }

        function info(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message, 'info'));
        }

        function error(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message, 'error'));
        }

        function debug(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message, 'debug'));
        }

        return {
            log: log,
            warn: warn,
            info: info,
            error: error,
            debug: debug
        };
    }

})(jQuery, window, AvayaRecordingClient);
