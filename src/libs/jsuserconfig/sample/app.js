(function($, window, AvayaUserClient) {

    'use strict';

    var resources,
        sessionId,
        userService,
        photoUploadEnabled,
        logger,
        resultContainer,
        clientConfig,
        client,
        locations,
        userSettings = {
            conferencing: {}
        },
        selectedVirtualRoom = {},
        timeFormat = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        },
        credentials = {
            login: '',
            password: '',
            organizationAlias: ''
        },
        serverUrl = {
            host: '',
            port: ''
        },
        clientParams;

    function initializeClientParams() {
        clientParams = {
            userTimeZone: {
                value: userSettings.userTimeZone,
                values: ["Pacific/Midway", "Pacific/Honolulu", "Pacific/Tahiti", "Pacific/Marquesas", "America/Anchorage",
                    "America/Los_Angeles", "America/Vancouver", "America/Denver", "America/Edmonton", "America/Phoenix",
                    "America/Chicago", "America/Mexico_City", "America/Winnipeg", "America/Indiana/Indianapolis",
                    "America/Montreal", "America/New_York", "America/Toronto", "America/Puerto_Rico", "Atlantic/Bermuda",
                    "Canada/Newfoundland", "America/Buenos_Aires", "America/Sao_Paulo", "America/Noronha", "America/Scoresbysund",
                    "Europe/Dublin", "Europe/London", "Greenwich", "Europe/Lisbon", "Europe/Amsterdam", "Europe/Berlin",
                    "Europe/Brussels", "Europe/Madrid", "Europe/Paris", "Europe/Rome", "Europe/Stockholm", "Europe/Vienna",
                    "Europe/Warsaw", "Europe/Zurich", "Africa/Cairo", "Asia/Beirut", "Asia/Istanbul", "Europe/Athens",
                    "Europe/Istanbul", "Europe/Kiev", "Asia/Jerusalem", "Asia/Tel_Aviv", "Asia/Baghdad", "Asia/Kuwait",
                    "Asia/Qatar", "Asia/Riyadh", "Europe/Minsk", "Europe/Moscow", "Asia/Tehran", "Asia/Dubai", "Asia/Kabul",
                    "Indian/Maldives", "Asia/Karachi", "Asia/Calcutta", "Asia/Katmandu", "Asia/Dhaka", "Asia/Rangoon",
                    "Asia/Bangkok", "Asia/Saigon", "Asia/Jakarta", "Australia/Perth", "Asia/Chongqing", "Asia/Macao",
                    "Asia/Shanghai", "Asia/Taipei", "Asia/Hong_Kong", "Asia/Kuala_Lumpur", "Asia/Manila", "Singapore",
                    "Asia/Jayapura", "Asia/Tokyo", "Asia/Seoul", "Australia/Darwin", "Australia/Adelaide", "Australia/Sydney",
                    "Australia/Queensland", "Australia/Hobart", "Australia/Melbourne", "Pacific/Guadalcanal", "Pacific/Norfolk",
                    "Pacific/Fiji", "Pacific/Auckland", "Pacific/Chatham", "Pacific/Tongatapu", "Pacific/Kiritimati"
                ],
                label: 'Time Zone',
                visibility: ['UPDATE'],
                enabled: true
            },
            location: {
                value: userSettings.conferencing.locationId,
                values: locations,
                fieldAsId: 'locationId',
                label: 'Location',
                visibility: ['UPDATE'],
                enabled: true
            },
            defaultVirtualRooms: {
                value: selectedVirtualRoom.virtualRoomId,
                values: userSettings.conferencing.virtualRoomSettings,
                fieldAsId: 'virtualRoomId',
                label: 'Virtual Rooms',
                visibility: ['UPDATE'],
                enabled: true
            },
            name: {
                value: selectedVirtualRoom.name,
                label: 'Virtual Room Name',
                visibility: ['UPDATE'],
                enabled: true
            },
            description: {
                value: selectedVirtualRoom.description,
                label: 'Virtual Room Description',
                visibility: ['UPDATE'],
                enabled: true
            },
            meetingType: {
                value: selectedVirtualRoom.serviceTemplateId,
                values: userSettings.conferencing.meetingServiceList,
                fieldAsId: 'serviceId',
                label: 'Meeting Type',
                visibility: ['UPDATE'],
                enabled: true,
                onChange: function(event, paramName) {}
            },
            moderatorPIN: {
                value: atob(selectedVirtualRoom.moderatorPIN),
                label: 'Moderator PIN',
                tooltip: 'Participants must enter this PIN to use moderator controls. Leave this blank to allow everyone in your meetings to use moderator controls.',
                visibility: ['UPDATE'],
                enabled: true
            },
            maxParticipants: {
                value: selectedVirtualRoom.maxParticipants,
                label: 'Max Participants',
                visibility: ['UPDATE'],
                enabled: true
            },
            defaultRoom: {
                value: selectedVirtualRoom.defaultRoom,
                label: 'Is default room',
                visibility: ['UPDATE'],
                enabled: true
            },
            allowKnocking: {
                value: selectedVirtualRoom.allowKnocking,
                label: 'Allow requests to join locked meetings',
                visibility: ['UPDATE'],
                enabled: true
            },
            waitingRoom: {
                value: selectedVirtualRoom.waitingRoom,
                label: "Place to a 'waiting room",
                tooltip: "Place participants in a 'waiting room' until the moderator joins",
                visibility: ['UPDATE'],
                enabled: true
            },
            allowRecording: {
                value: selectedVirtualRoom.allowRecording,
                values: ['ON', 'OFF'],
                label: 'Turn on recording automatically',
                tooltip: 'Turn on recording automatically at the start of meetings',
                visibility: ['UPDATE'],
                enabled: true
            },
            oneTimePINRequired: {
                value: selectedVirtualRoom.oneTimePINRequired,
                label: "Use one-time PIN",
                tooltip: "Use one-time PIN for each meeting",
                visibility: ['UPDATE'],
                enabled: true,
                onChange: function() {
                    $('#accessPIN').prop('disabled', !$('#accessPIN').prop('disabled'));
                }
            },
            accessPIN: {
                value: atob(selectedVirtualRoom.accessPIN),
                label: 'Permanent PIN',
                tooltip: 'Participants must enter this PIN to join your meetings',
                visibility: ['UPDATE'],
                enabled: true
            },

            // Password change parameters
            oldPassword: {
                value: credentials.password,
                label: 'Old Password',
                tooltip: 'Old Password',
                visibility: ['PASSWORD'],
                enabled: true
            },
            newPassword: {
                value: '',
                label: 'New Password',
                tooltip: 'New Password',
                visibility: ['PASSWORD'],
                enabled: true
            },
        };
    }

    $(document).ready(function() {
        logger = logWidget();
        resultContainer = $('#search-results');

        $('.button-collapse').sideNav();
        $('.tooltipped').tooltip({
            delay: 50
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
            if ($(this).prop('type') === 'select-one') {
                obj[property] = $(this).prop('value');
            }
        }

        function updateClientProperty(obj, property) {
            obj[property] = $(this).val();
        }

        bindInputWithProperty('#credentials-host', updateClientProperty, serverUrl, 'host');
        bindInputWithProperty('#credentials-port', updateClientProperty, serverUrl, 'port');
        bindInputWithProperty('#credentials-tenant', updateClientProperty, credentials, 'organizationAlias');
        bindInputWithProperty('#credentials-login', updateClientProperty, credentials, 'login');
        bindInputWithProperty('#credentials-password', updateClientProperty, credentials, 'password');

        $('a[href^="#test"]').on('click', function(event) {
            initializeClientParams();
            $('[id^="test"]' + ' > div').remove();
            $('div' + this.hash).prepend(function() {
                if (!resources) {
                    return '<div class="col s12"><div class="z-depth-1 white">CONFIGURATION is not set!</div></div>'
                }
                var htmlString = '<div class="col s12">' +
                    '<div class="z-depth-1 white">',
                    self = this;

                for (var key in clientParams) {
                    var adding = false,
                        field = '';
                    clientParams[key].visibility.forEach(function(element) {
                        if ($(self).attr('data-program-test') === element) {
                            adding = true;
                        }
                    });

                    if (clientParams[key].values) {
                        var options = '';
                        clientParams[key].values.forEach(function(option) {
                            if (option instanceof Object && !(option instanceof String)) {
                                options += '<option value="' + (option.id ? option.id : option[clientParams[key].fieldAsId]) + '">' +
                                    (option.name ? option.name : option[clientParams[key].fieldAsName]) + '</option>'
                            } else {
                                options += '<option value="' + option + '">' + option + '</option>'
                            }
                        });

                        field = '<div class="input-field col s12">' +
                            '<label for="' + key + '" class="active">' + clientParams[key].label + '</label>' +
                            '<div class="s12">' +
                            '<select class="browser-default" id="' + key + '"' +
                            +' data-tooltip="' + clientParams[key].tooltip + '"' +
                            (clientParams[key].onChange ? (' onchange="(' + clientParams[key].onChange + ')(event, id)">') : '>') +
                            options +
                            '</select></div></div>';

                    } else {
                        field = '<div class="input-field col s12">' +
                            '<input class="tooltipped" id="' + key + '" type="' + (clientParams[key].type || (typeof clientParams[key].value === 'boolean' ? 'checkbox' : 'text')) +
                            '" data-position="right"' + 'data-tooltip="' + clientParams[key].tooltip + '"' +
                            (clientParams[key].onChange ? (' onchange="(' + clientParams[key].onChange + ')(event, id)">') : '>') +
                            '<label for="' + key + '" class="' + (clientParams[key].value !== undefined ? 'active' : '') + '"' +
                            +' data-tooltip="' + clientParams[key].tooltip + '"' +
                            '>' + clientParams[key].label + '</label>' +
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

            $('#defaultVirtualRooms').on('change', function(e) {
                // merge changes to global room settings array
                udateVirtualRoomDetails();
                mergeById(selectedVirtualRoom.virtualRoomId, userSettings.conferencing.virtualRoomSettings, "virtualRoomId", selectedVirtualRoom);
                
                selectedVirtualRoom = searchById(clientParams.defaultVirtualRooms.value, userSettings.conferencing.virtualRoomSettings, "virtualRoomId");
                initializeClientParams();
                $('a[href^="#test5"]').click();
            });
            $('#defaultRoom').on('change', function(e) {
                if (e.target.checked) {
                    logger.log('default Virtual Room changed');
                    //disable defaultRoom flags in all rooms
                    userSettings.conferencing.virtualRoomSettings.forEach(function(room){
                        room.defaultRoom = false;
                    });
                    userSettings.conferencing.defaultVirtualRoom = selectedVirtualRoom.virtualRoomId;
                    initializeClientParams();
                }
            });

        });

        $('#upload-input').on('change', function(e) {
            var fileReader = new FileReader();
            fileReader.onloadend = function(data) {
                logger.log('Applying picture from file...');
                var parsedConfig = JSON.parse(data.target.result);
                uploadConfig(parsedConfig);
            };
            fileReader.readAsText(e.target.files[0]);

            function uploadConfig(parsedConfig) {
                serverUrl.host = parsedConfig.host;
                serverUrl.port = parsedConfig.port;
                credentials.organizationAlias = parsedConfig.organizationAlias;
                credentials.login = parsedConfig.login;
                credentials.password = parsedConfig.password;

                bindInputWithProperty('#credentials-host', updateClientProperty, serverUrl, 'host');
                bindInputWithProperty('#credentials-port', updateClientProperty, serverUrl, 'port');
                bindInputWithProperty('#credentials-tenant', updateClientProperty, credentials, 'organizationAlias');
                bindInputWithProperty('#credentials-login', updateClientProperty, credentials, 'login');
                bindInputWithProperty('#credentials-password', updateClientProperty, credentials, 'password');

                logger.log('Configuration has been applied.');
            }
        });

        $(window).on('scroll', function(event) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > $('.result-block').height()) {
                return;
            } else if (scrolled > 72) {
                $('.result-block').css('margin-top', 'calc(-64px - 0.5rem + ' + scrolled + 'px)');
            } else {
                $('.result-block').css('margin-top', '0.5rem');
            }
        });
    });

    function udateVirtualRoomDetails() {
        userSettings.userTimeZone = clientParams.userTimeZone.value;
        userSettings.conferencing.location = clientParams.location.value;

        selectedVirtualRoom.servicePrefix =  searchById(clientParams.meetingType.value, userSettings.conferencing.meetingServiceList, "serviceId").prefix;
        selectedVirtualRoom.name = clientParams.name.value;
        selectedVirtualRoom.description = clientParams.description.value;
        selectedVirtualRoom.meetingType = clientParams.meetingType.value;      
        selectedVirtualRoom.maxParticipants = clientParams.maxParticipants.value;
        selectedVirtualRoom.defaultRoom = clientParams.defaultRoom.value;
        selectedVirtualRoom.allowKnocking = clientParams.allowKnocking.value;
        selectedVirtualRoom.waitingRoom = clientParams.waitingRoom.value;
        selectedVirtualRoom.allowRecording = clientParams.allowRecording.value;
        selectedVirtualRoom.oneTimePINRequired = clientParams.oneTimePINRequired.value;
       
        selectedVirtualRoom.moderatorPIN = btoa(clientParams.moderatorPIN.value);
        selectedVirtualRoom.accessPIN = btoa(clientParams.accessPIN.value);
    }

    function showResult(response, img) {
        var tabLevel = 0,
            stringSize;
        resultContainer.empty();
        if (response && img) {
            var image = $('<image alt="There is no User picture."/>');
            image.attr('src', response);
            image.css('width', '300px').css('height', '300px');
            image.css('display', 'block');
            image.css('border', '1px solid dark');
            resultContainer.append(image);
            return;
        } else if (response && typeof response !== 'string') {
            var li = $('<li/>');
            li.html('<div class="item">' + JSON.stringify(response, undefined, 4)
                .replace(/_(\w+)/g, '$1')
                .replace(/"(\w+)"/g, function(x, y) {
                    return '"' + y.charAt(0).toUpperCase() + y.slice(1) + '"';
                })
                .replace(/"validator":\{\},/ig, '')
                .replace(/\"(\w+)\":/g, '<b>$1: </b>')
                .replace(/^\{/g, '')
                .replace(/\}$/g, '') + '</div>');
            resultContainer.append(li);
        } else if (typeof response === 'string') {
            var li = $('<li/>');
            li.html('<h5>' + response + '</h5>');
            resultContainer.append(li);
        } else {
            var li = $('<li/>');
            li.html('<h5>No results were found</h5>');
            resultContainer.append(li);
        }
    }

    // idName is an optional parameter
    // "id" key name is used as default for search by
    function searchById(idValue, myArray, idName) {
        if (idName === undefined) {
            idName = "id";
        }
        if (myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i][idName] === idValue) {
                    return myArray[i];
                }
            }
        }
    }

    function mergeById(idValue, myArray, idName, element) {
        if (idName === undefined) {
            idName = "id";
        }
        if (myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i][idName] === idValue) {
                    $.extend( myArray[i], element );
                }
            }
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

                logger.log('Login request. STEP 3: Getting user (by token) resources.');
                return fetchResources(response.token).then(
                    function(response) {
                        logger.log('Get resources request success');
                        resources = response;
                        clientConfig = new AvayaUserClient.Config.ClientConfig(response);
                        clientConfig.logger = logger;
                        client = new AvayaUserClient(clientConfig);
                        userService = client.userService;
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
        if (!serverUrl.host || !serverUrl.port || !credentials.organizationAlias) {
            logger.error('CONFIGURATION is not set!');
        }
        var resourcesUrl = 'https://' + serverUrl.host + ':' + serverUrl.port + '/ups/resources/tenants/' + credentials.organizationAlias + '/';
        return httpConnectionService().get(token, resourcesUrl).then(
            function(response) {
                logger.log('Get resources request success');
                resources = response;
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
            logger.log('UserService: logout: %o : %o', res, res2);
            clientParams.user.value = undefined;
            Materialize.toast($('<span class="error">ACSR Authentication Service: logout!.</span>'), 5000, 'left teal lighten-5');
        }).fail(function(res) {
            logger.warn('UserService: logout fail. Response=%o', res);

        });
    }

    function isServiceStarted() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        showResult('Is Avaya User Client started?: ' + userService.isStarted());
    }

    function startService() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login first.');
            return;
        }

        var resourcesUrl = 'https://' + serverUrl.host + ':' + serverUrl.port + '/acs/resources';

        var origin = resources.aadsServicesUrl ?
            resources.aadsServicesUrl :
            (serverUrl.host + ':' + serverUrl.port);
        var resourcesUrl = origin + '/acs/resources';

        httpConnectionService().get(localStorage.UPS_TOKEN, resourcesUrl).then(
            function onSuccess(response) {
                logger.log('Get acs resources request success');
                photoUploadEnabled = response.photoUploadEnabled;

                userService.start(localStorage.UPS_TOKEN, response.resources.pictures.GET.getUserPicture.href)
                    .done(function() {
                        showResult('UserService started ');
                    }).fail(function() {
                        showResult('UserService not started ');
                    });
            },
            function onFail(response) {
                logger.warn('Get acs resources request fail, response=%o', response);
                userService.start(localStorage.UPS_TOKEN)
                    .done(function() {
                        showResult('UserService started ');
                    }).fail(function() {
                        showResult('UserService not started ');
                    });
            }
        );

        var locationUrl = 'https://' + serverUrl.host + ':' + serverUrl.port + '/ups/resources/tenants/' + credentials.organizationAlias + '/location/';
        httpConnectionService().get(localStorage.UPS_TOKEN, locationUrl).then(
            function(response) {
                logger.log('Get locations request success');
                locations = response.location;
                locations.splice(0, 0, {
                    "locationId": "",
                    "name": "Auto"
                });
            }
        );
    }

    function stopService() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        showResult('UserService: isStarted = ' + userService.stop());
    }

    function getUserConfig() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        userService.getUserConfig().done(function(response) {
            logger.log('getUserConfig: %o', response);
            userSettings = response.userConfig;
            selectedVirtualRoom = searchById(userSettings.conferencing.defaultVirtualRoom, userSettings.conferencing.virtualRoomSettings, "virtualRoomId");
            initializeClientParams();
            showResult(response.userConfig);
        }).fail(function(response) {
            console.error('getUserConfig: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function updateUserConfig() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        if (!userSettings) {
            showResult(' Try to get User Config first.');
            return;
        }
        // merge changes to global room settings array
        udateVirtualRoomDetails();
        mergeById(selectedVirtualRoom.virtualRoomId, userSettings.conferencing.virtualRoomSettings, "virtualRoomId", selectedVirtualRoom);

        var userDetailsUpdate = {
            "locationId": userSettings.conferencing.location,
            "userTimeZone": userSettings.userTimeZone,
            "defaultVirtualRoom": userSettings.conferencing.defaultVirtualRoom,
            "preferences": [],
            "virtualRoomSettings": userSettings.conferencing.virtualRoomSettings
        };

        userService.updateUserConfig(new AvayaUserClient.UserService.UserDetailsUpdate(userDetailsUpdate)).done(function(response) {
            logger.log('updateUserConfig: %o', response);
            showResult(['Settings Updated sucessfully', response]);
        }).fail(function(response) {
            console.error('updateUserConfig fail: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function changePassword() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        userService.changePassword(clientParams.oldPassword.value, localStorage.UPS_TOKEN, clientParams.newPassword.value).done(function(response) {
            logger.log('changePassword: %o', response);
            showResult(response);
        }).fail(function(response) {
            console.error('changePassword: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function postPicture(e) {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        if (!photoUploadEnabled) {
            showResult('Photo uploading is disabled on server');
            return;
        }

        logger.log('Changing user photo');

        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');
        var _URL = window.URL || window.webkitURL;
        var img = new Image();
        img.onload = function() {
            var origW = this.width;
            var origH = this.height;
            var sx0 = Math.max((origW - origH) / 2, 0);
            var sy0 = Math.max((origH - origW) / 2, 0);
            var sWH = Math.min(origH, origW);

            var scaleForFirst = Math.sqrt(e.files[0].size / (1024 * 100)) * 1.1; // +10%

            fitImageAndSend(scaleForFirst);

            function fitImageAndSend(scale) {
                var dWH = sWH / scale;
                canvas.width = canvas.height = dWH;
                context.drawImage(img, sx0, sy0, sWH, sWH, 0, 0, dWH, dWH);
                canvas.toBlob(function(result) {
                    if (result.size / 1024 < 100) {
                        logger.log('Send user photo');

                        userService.postPicture(result).done(function(response) {
                            logger.log('postPicture: %o', response);
                            showResult(response);
                        }).fail(function(response) {
                            console.error('postPicture: %o', response);
                            showResult(response.responseJSON || response.responseText);
                        });

                    } else {
                        var newScale = scale * Math.sqrt(result.size / (1024 * 100)) * 1.1;
                        logger.log('New photo does not fit into limits, try again');
                        fitImageAndSend(newScale);
                    }
                });
            }
        };
        img.src = _URL.createObjectURL(e.files[0]);
    }

    function deletePicture() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        userService.deletePicture().done(function(response) {
            logger.log('deletePicture: %o', response);
            showResult(response);
        }).fail(function(response) {
            console.error('deletePicture: %o', response);
            showResult(response.responseJSON || response.responseText);
        });
    }

    function getPicture() {
        if (!userService) {
            showResult('Avaya User Client not initialized. Try to login then start service.');
            return;
        }
        var pictureUrl = userService.getPicture();
        logger.log('getPicture: %s', pictureUrl);
        showResult(pictureUrl, true);
    }

    window.testApp = {
        login: login,
        startService: startService,
        stopService: stopService,
        isServiceStarted: isServiceStarted,
        getUserConfig: getUserConfig,
        updateUserConfig: updateUserConfig,
        changePassword: changePassword,
        deletePicture: deletePicture,
        getPicture: getPicture,
        postPicture: postPicture
    };

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

})(jQuery, window, AvayaUserClient);
