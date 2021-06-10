/*
 * Avaya Inc. Proprietary (Restricted)
 * Solely for authorized persons having a need to know
 * pursuant to company instructions.
 * Copyright 2006-2016 Avaya Inc. All Rights Reserved.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or
 * intended publication of such source code.
 */
(function($, window) {
    'use strict';

    var resources,
        sessionId,
        service,
        editableMeeting,
        isNewMeeting,
        logger = logWidget();

    var fetchFromInput,
        fetchToInput,
        fetchDateInput;

    var meetingContainer = $('#search-results'),
        meetingDetailsOverlay = $('#meeting-details-overlay');

    meetingDetailsOverlay.click(function(e) {
        if (e.target.id === 'meeting-details-overlay') {
            meetingDetailsOverlay.addClass('hide');
        }
    });

    function uploadConfig(parsedConfig) {
        var config = {
            login: '',
            password: '',
            hostAndPort: '',
            alias: ''
        };
        config = $.extend(true, config, parsedConfig);

        populateInputWithField('credentials-login', config.login);
        populateInputWithField('credentials-password', config.password);
        populateInputWithField('credentials-host-port', config.hostAndPort);
        populateInputWithField('credentials-alias', config.alias);

        logger.log('Configuration has been applied.');
    }

    function login(loginValue, passwordValue, hostAndPortValue, aliasValue) {
        logger.log('Login request. START');
        if (!window.localStorage) {
            logger.warn('Browser does not support localStorage.');
            return;
        }
        var credentials = {
            login: loginValue,
            password: passwordValue,
            organizationAlias: aliasValue
        };

        function onFetchGuestResourcesSuccess() {
            logger.log('Guest resources are fetched');

            function onLoginSuccess(response) {
                logger.log('User is logged in, Token received');
                window.localStorage.setItem('UPS_TOKEN', response.token);
                logger.log('UPS token has been added to localStorage');

                function onFetchResourcesSuccess(resources) {
                    logger.log('Full (user) resources are fetched');
                    logger.log('Login request. FINISH. Start AvayaMeetingManagementService.');
                    startAvayaMeetingManagementService(resources);
                    $('#upload-btn').addClass('hide');
                    $('#login-btn').addClass('hide');
                    $('#logout-btn').removeClass('hide');
                    $('#fetch-meetings-by-period-btn').removeClass('disabled');
                    $('#fetch-meetings-by-date-btn').removeClass('disabled');
                    $('#fetch-meetings-by-id-btn').removeClass('disabled');
                    $('#fetch-meetings-by-status-btn').removeClass('disabled');
                    $('#fetch-meetings-ongoing-btn').removeClass('disabled');
                    $('#fetch-meetings-starts-in-btn').removeClass('disabled');
                    $('#create-meeting-btn').removeClass('disabled');
                }

                logger.log('Login request. STEP 3: Getting user (by token) resources.');
                return fetchResources(hostAndPortValue, aliasValue, response.token).then(onFetchResourcesSuccess, onFetchResourcesError);
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
        return fetchResources(hostAndPortValue, aliasValue).then(onFetchGuestResourcesSuccess, onFetchResourcesError);
    }

    function startAvayaMeetingManagementService(resources) {
        var client = new AvayaMeetingManagementClient(new AvayaMeetingManagementClient.Config.ClientConfig({
            resources: resources
        }));
        service = client.meetingManagementService;

        service.start(window.localStorage.getItem('UPS_TOKEN'));
        logger.log('AvayaMeetingManagementService started');
    }

    function stopAvayaMeetingManagementService() {
        if (service) {
            service.stop();
            logger.log('AvayaMeetingManagementService stopped');
        }
    }

    jQuery(document).ready(function($) {
        $(document).ready(function() {
            fetchFromInput = $('#fetch-from').pickadate({
                selectMonths: true,
                selectYears: 15
            });
            fetchToInput = $('#fetch-to').pickadate({
                selectMonths: true,
                selectYears: 15
            });
            fetchDateInput = $('#fetch-date').pickadate({
                selectMonths: true,
                selectYears: 15
            });
            fetchFromInput.pickadate('picker').set('select', new Date());
            fetchToInput.pickadate('picker').set('select', new Date());
            fetchDateInput.pickadate('picker').set('select', new Date());
            $('select').material_select();
        });
    });

    $('#upload-input').on('change', function(e) {
        var fileReader = new FileReader();
        fileReader.onloadend = function(data) {
            logger.log('Applying config from file...');
            var parsedConfig = JSON.parse(data.target.result);
            uploadConfig(parsedConfig);
        };
        fileReader.readAsText(e.target.files[0]);
    });

    $('#login-btn').on('click', function() {
        login($('#credentials-login').val(), $('#credentials-password').val(), $('#credentials-host-port').val(), $('#credentials-alias').val());
    });

    $('#logout-btn').on('click', function() {
        stopAvayaMeetingManagementService();
        $('#upload-btn').removeClass('hide');
        $('#login-btn').removeClass('hide');
        $('#logout-btn').addClass('hide');
        $('#fetch-meetings-by-period-btn').addClass('disabled');
        $('#fetch-meetings-by-date-btn').addClass('disabled');
        $('#fetch-meetings-by-id-btn').addClass('disabled');
        $('#fetch-meetings-by-status-btn').addClass('disabled');
        $('#fetch-meetings-ongoing-btn').addClass('disabled');
        $('#fetch-meetings-starts-in-btn').addClass('disabled');
        $('#create-meeting-btn').addClass('disabled');
        delete window.localStorage['UPS_TOKEN'];
    });

    $('#fetch-meetings-by-period-btn').on('click', function() {
        var fetchFrom = fetchFromInput.pickadate('picker').get('select').obj;
        var fetchTo = fetchToInput.pickadate('picker').get('select').obj;
        fetchTo.setHours(23, 59);
        if ($('#past-meetings-checkbox').prop('checked')) {
            $.when(service.getMeetingListByPeriod(fetchFrom, fetchTo, true, $('#detailed-checkbox').prop('checked')),
                    service.getMeetingListByPeriod(fetchFrom, fetchTo, false, $('#detailed-checkbox').prop('checked')))
                .then(function(firstResponse, secondResponse) {
                    var meetings = firstResponse[0].meetings.concat(secondResponse[0].meetings);
                    logger.log('getMeetingListByPeriod request is succeed');
                    clear();
                    if (meetings.length === 0) {
                        $('#no-results-modal').openModal();
                    }
                    meetings.forEach(function(meeting) {
                        addMeeting(meeting);
                    });
                }, function(reason) {
                    logger.warn('one or both of getMeetingListByPeriod requests is failed: %s', JSON.stringify(reason));
                });
        } else {
            service.getMeetingListByPeriod(fetchFrom, fetchTo, false, $('#detailed-checkbox').prop('checked')).then(function(response) {
                logger.log('getMeetingListByPeriod request is succeed');
                clear();
                if (response.meetings.length === 0) {
                    $('#no-results-modal').openModal();
                }
                response.meetings.forEach(function(meeting) {
                    addMeeting(meeting);
                });
            }, function(reason) {
                logger.warn('getMeetingListByPeriod request is failed: %s', JSON.stringify(reason));
            });
        }
    });

    $('#fetch-meetings-by-date-btn').on('click', function() {
        var fetchDate = fetchDateInput.pickadate('picker').get('select').obj;
        if ($('#past-meetings-checkbox').prop('checked')) {
            $.when(service.getMeetingListByDate(fetchDate, true, $('#detailed-checkbox').prop('checked')),
                    service.getMeetingListByDate(fetchDate, false, $('#detailed-checkbox').prop('checked')))
                .then(function(firstResponse, secondResponse) {
                    var meetings = firstResponse[0].meetings.concat(secondResponse[0].meetings);
                    logger.log('getMeetingListByDate request is succeed');
                    clear();
                    if (meetings.length === 0) {
                        $('#no-results-modal').openModal();
                    }
                    meetings.forEach(function(meeting) {
                        addMeeting(meeting);
                    });
                }, function(reason) {
                    logger.warn('one or both of getMeetingListByDate requests is failed: %s', JSON.stringify(reason));
                });
        } else {
            service.getMeetingListByDate(fetchDate, false, $('#detailed-checkbox').prop('checked')).then(function(response) {
                logger.log('getMeetingListByDate request is succeed');
                clear();
                if (response.meetings.length === 0) {
                    $('#no-results-modal').openModal();
                }
                response.meetings.forEach(function(meeting) {
                    addMeeting(meeting);
                });
            }, function(reason) {
                logger.warn('getMeetingListByDate request is failed: %s', JSON.stringify(reason));
            });
        }
    });

    $('#fetch-meetings-by-id-btn').on('click', function() {
        service.getMeetingById($('#fetch-id').val()).then(function(response) {
            logger.log('getMeetingById request is succeed');
            clear();
            if (response.meetings.length === 0) {
                $('#no-results-modal').openModal();
            }
            response.meetings.forEach(function(meeting) {
                addMeeting(meeting);
            });
        }, function(reason) {
            logger.warn('getMeetingById request is failed: %s', JSON.stringify(reason));
        });
    });

    $('#fetch-meetings-by-status-btn').on('click', function() {
        service.getMeetingListByStatus($('#fetch-status').val(), $('#detailed-checkbox').prop('checked')).then(function(response) {
            logger.log('getMeetingListByStatus request is succeed');
            clear();
            if (response.meetings.length === 0) {
                $('#no-results-modal').openModal();
            }
            response.meetings.forEach(function(meeting) {
                addMeeting(meeting);
            });
        }, function(reason) {
            logger.warn('getMeetingListByStatus request is failed: %s', JSON.stringify(reason));
        });
    });

    $('#fetch-meetings-ongoing-btn').on('click', function() {
        service.getMeetingListIsOngoing($('#detailed-checkbox').prop('checked')).then(function(response) {
            logger.log('getMeetingListIsOngoing request is succeed');
            clear();
            if (response.meetings.length === 0) {
                $('#no-results-modal').openModal();
            }
            response.meetings.forEach(function(meeting) {
                addMeeting(meeting);
            });
        }, function(reason) {
            logger.warn('getMeetingListIsOngoing request is failed: %s', JSON.stringify(reason));
        });
    });

    $('#fetch-meetings-starts-in-btn').on('click', function() {
        service.getMeetingListStartsIn($('#fetch-starts-in').val(), $('#detailed-checkbox').prop('checked')).then(function(response) {
            logger.log('getMeetingListStartsIn request is succeed');
            clear();
            if (response.meetings.length === 0) {
                $('#no-results-modal').openModal();
            }
            response.meetings.forEach(function(meeting) {
                addMeeting(meeting);
            });
        }, function(reason) {
            logger.warn('getMeetingListStartsIn request is failed: %s', JSON.stringify(reason));
        });
    });

    $('#create-meeting-btn').on('click', function() {
        logger.log('Create new meeting object');
        var meeting = new AvayaMeetingManagementClient.MeetingManagementService.Meeting();
        meeting.duration = 'P0Y0M0DT0H30M0.000S';
        meeting.startTime = new Date(Date.now());
        meeting.startTime = meeting.startTime.setHours(meeting.startTime.getHours() + 1, 0);
        isNewMeeting = true;
        editableMeeting = meeting;
        showMeetingDetails(meeting);
    });

    $('#md_number').on('change', function() {
        mandatoryFieldsFilled();
    });
    $('#md_start_time').on('change', function() {
        mandatoryFieldsFilled();
    });
    $('#md_duration').on('change', function() {
        mandatoryFieldsFilled();
    });

    $('#md_thumbnail').on('change', function(changeEvent) {
        if (changeEvent.target.files.length === 0) {
            return;
        }
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            var mimeType = event.target.result.match(/^data:(\D+);/)[1];
            var base64File = event.target.result.match(/;base64,(.+)/)[1];
            $('#md_thumbnail_img').attr('src', "data:" + mimeType + ";base64," + base64File);
            populateInputWithField('md_thumbnailMimeType', mimeType);
        };
        fileReader.readAsDataURL(changeEvent.target.files[0]);
    });

    $('#md_save_changes_btn').on('click', function() {
        $('#wait-modal').openModal();
        var meetingObj = new AvayaMeetingManagementClient.MeetingManagementService.Meeting(populateMeeting(editableMeeting));

        (function () {
            if (isNewMeeting) {
                return service.createMeeting(meetingObj);
            } else {
                return service.updateMeeting(meetingObj);
            }
        })().then(meetingActionSuccess, meetingActionFailure);
    });

    $('#md_delete_meeting_btn').on('click', function() {
        $('#wait-modal').openModal();
        service.cancelMeeting(editableMeeting.conferenceId).then(meetingActionSuccess, meetingActionFailure);
    });

    $('#md_close_btn').on('click', function() {
        meetingDetailsOverlay.addClass('hide');
    });

    $('#md_add_attendee_btn').on('click', function() {
        var index = $('#md_attendees').children().length;
        var attendee = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee();
        addMultivaluedField(buildElementObject('attendee', index, attendee));
    });

    function fetchResources(hostAndPort, alias, token) {
        var resourcesUrl = 'https://' + hostAndPort + '/ups/resources/tenants/' + alias + '/';
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

    function clear() {
        meetingContainer.empty();
    }

    function addMeeting(meeting) {
        var li = $('<li/>');
        li.append(createMeetingItem(meeting));
        meetingContainer.append(li);
    }

    function createMeetingItem(meeting) {
        var prototype = $('#meeting-prototype').clone();
        prototype.attr('id', meeting.conferenceId);
        var startTimeOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        var endTimeOptions = {
            hour: 'numeric',
            minute: 'numeric'
        };
        prototype.find('.start-time').text(new Date(meeting.startTime).toLocaleString('en-US', startTimeOptions));
        prototype.find('.end-time').text(new Date(meeting.plannedEndTime).toLocaleString('en-US', endTimeOptions));
        prototype.find('.subject').text(meeting.subject);
        prototype.find('.details').text(meeting.description);

        prototype.click(function() {
            isNewMeeting = false;
            var meetingForEdit = new AvayaMeetingManagementClient.MeetingManagementService.Meeting(meeting);
            editableMeeting = meetingForEdit;
            showMeetingDetails(meetingForEdit);
        });
        return prototype;
    }

    function populateInputWithField(inputId, field, type) {
        var jqInput = $('#' + inputId);
        if (jqInput.prop('type') === 'text') {
            jqInput.val(field);
            if (field !== "") {
                $('[for="' + inputId + '"]').addClass('active');
            } else {
                $('[for="' + inputId + '"]').removeClass('active');
            }
        } else if (jqInput.prop('type') === 'checkbox') {
            jqInput.prop('checked', field);
        } else if (jqInput.is('select')) {
            if (type === 'number') {
                field = field.toString();
            }
            $('#' + inputId + ' option[value="' + field + '"]').prop('selected', true);
        }
    }

    function showMeetingDetails(meeting) {
        logger.log('showMeetingDetails');
        $('#md_title').text('Meeting details');
        populateInputWithField('md_subject', meeting.subject);
        populateInputWithField('md_start_time', new Date(meeting.startTime).toString());
        populateInputWithField('md_end_time', meeting.plannedEndTime ? new Date(meeting.plannedEndTime).toString() : '');
        populateInputWithField('md_user_id', meeting.userId);
        populateInputWithField('md_member_id', meeting.memberId);
        populateInputWithField('md_number', meeting.number);
        populateInputWithField('md_access_pin', atob(meeting.accessPIN));
        populateInputWithField('md_moderator_pin', atob(meeting.moderatorPIN));
        populateInputWithField('md_status', meeting.status);
        populateInputWithField('md_serviceTemplateId', meeting.serviceTemplateId);
        populateInputWithField('md_servicePrefix', meeting.servicePrefix);
        populateInputWithField('md_priority', meeting.priority);
        populateInputWithField('md_allowStreaming_select', meeting.allowStreaming);
        populateInputWithField('md_streamingStatus_select', meeting.streamingStatus);
        populateInputWithField('md_blockDialIn_checkbox', meeting.blockDialIn);
        populateInputWithField('md_autoExtend_checkbox', meeting.autoExtend);
        populateInputWithField('md_waitingRoom_checkbox', meeting.waitingRoom);
        populateInputWithField('md_oneTimePINRequired_checkbox', meeting.oneTimePINRequired);
        populateInputWithField('md_conferenceId', meeting.conferenceId);
        populateInputWithField('md_description', meeting.description);
        populateInputWithField('md_earlyTime', meeting.earlyTime ? new Date(meeting.earlyTime).toString() : '');
        populateInputWithField('md_timeZoneId', meeting.timeZoneId);
        populateInputWithField('md_duration', meeting.duration);
        populateInputWithField('md_locationId', meeting.locationId);
        populateInputWithField('md_testOnly_checkbox', meeting.testOnly);
        populateInputWithField('md_sendingNotification_checkbox', meeting.sendingNotification);
        populateInputWithField('md_recordingMeetingWhenStart_checkbox', meeting.recordingMeetingWhenStart);
        populateInputWithField('md_durationAfterLeft', meeting.advancedProperties.durationAfterLeft);
        populateInputWithField('md_terminationCondition', meeting.advancedProperties.terminationCondition);
        populateInputWithField('md_maxParticipants', meeting.advancedProperties.maxParticipants);
        populateInputWithField('md_numberOfEveryDay', meeting.daily.numberOfEveryDay);
        populateInputWithField('md_everyWeekDay_checkbox', meeting.daily.everyWeekDay);
        populateInputWithField('md_numberOfEveryWeek', meeting.weekly.numberOfEveryWeek);
        populateInputWithField('md_daysOfWeek', JSON.stringify(meeting.weekly.daysOfWeek));
        populateInputWithField('md_numberOfEveryMonth', meeting.weekly.numberOfEveryMonth);
        populateInputWithField('md_dayOfMonth', meeting.weekly.dayOfMonth);
        populateInputWithField('md_dayOfNumberOfEveryMonth', meeting.weekly.dayOfNumberOfEveryMonth);
        populateInputWithField('md_endOfOccurrences', meeting.recurrenceEnd.endOfOccurrences);
        populateInputWithField('md_by', meeting.recurrenceEnd.by);
        populateInputWithField('md_broadcast_subject', meeting.broadcastSetting.subject);
        populateInputWithField('md_pin', btoa(meeting.broadcastSetting.pin));
        $('#md_thumbnail_img').attr('src', "data:" + meeting.broadcastSetting.thumbnailMimeType + ";base64," + meeting.broadcastSetting.thumbnail);
        populateInputWithField('md_thumbnailMimeType', meeting.broadcastSetting.thumbnailMimeType);
        populateInputWithField('md_profile', meeting.broadcastSetting.profile);
        populateInputWithField('md_broadcast_description', meeting.broadcastSetting.description);
        populateInputWithField('md_public_checkbox', meeting.broadcastSetting.public);
        populateInputWithField('md_questionsAndAnswersEnabled_checkbox', meeting.broadcastSetting.questionsAndAnswersEnabled);
        populateInputWithField('md_moderatorPIN', btoa(meeting.broadcastSetting.moderatorPIN));
        populateInputWithField('md_programId', meeting.broadcastSetting.programId !== '' ? meeting.broadcastSetting.programId : generateUUID());
        populateInputWithField('md_accessMode', meeting.broadcastSetting.accessModeSetting.accessMode);
        populateInputWithField('md_userIds', meeting.broadcastSetting.accessModeSetting.userIds);

        $('#md_attendees').empty();
        var attendees = meeting.attendees;
        for (var i = 0; i < attendees.length; i++) {
            addMultivaluedField(buildElementObject('attendee', i, attendees[i]));
        }

        var thumbnail_control = $("#md_thumbnail");
        thumbnail_control.replaceWith(thumbnail_control = thumbnail_control.clone(true));

        mandatoryFieldsFilled();
        meetingDetailsOverlay.removeClass('hide');
    }

    function mandatoryFieldsFilled() {
        if ($('#md_number').val().trim() !== '' && $('#md_start_time').val().trim() !== '' && $('#md_duration').val().trim() !== '') {
            $('#mandatory-fields-prompt').addClass('hide');
            $('#mandatory-fields-ok').removeClass('hide');
            $('#md_save_changes_btn').removeClass('disabled');
        } else {
            $('#mandatory-fields-prompt').removeClass('hide');
            $('#mandatory-fields-ok').addClass('hide');
            $('#md_save_changes_btn').addClass('disabled');
        }
    }

    function meetingActionSuccess() {
        $('#wait-modal').closeModal();
        meetingDetailsOverlay.addClass('hide');
    }

    function meetingActionFailure(error) {
        var errorMessage;
        if (error && error.responseJSON && error.responseJSON.error[0]) {
            errorMessage = error.responseJSON.error[0].errorMsg ||
                           error.responseJSON.error[0].errorCode ||
                           error.responseJSON.error[0].displayMsg;
        } else if (error && error.errors && error.errors[0]) {
            errorMessage = error.errors[0];
        }
        errorMessage = 'Meeting operation failed: ' + errorMessage;
        logger.log(errorMessage);
        $('#failure-modal').find('p').text(errorMessage);
        $('#wait-modal').closeModal();
        $('#failure-modal').openModal();
    }

    function populateMeeting(meeting) {
        var populateFieldFromInput = function(inputId, type) {
            var jqInput = $('#' + inputId);
            if (jqInput.prop('type') === 'text') {
                var value = jqInput.val();
                return value;
            } else if (jqInput.prop('type') === 'checkbox') {
                return jqInput.prop('checked');
            } else if (jqInput.is('select')) {
                var val = $('#' + inputId + ' option:selected').val();
                if (type === 'number') {
                    val = parseFloat(val);
                }
                return val;
            }
        };

        meeting.subject = populateFieldFromInput('md_subject');
        meeting.startTime = new Date(populateFieldFromInput('md_start_time')).getTime();
        var plannedEndTime = populateFieldFromInput('md_end_time');
        if (plannedEndTime !== '') {
            meeting.plannedEndTime = new Date(plannedEndTime).getTime();
        }
        meeting.userId = populateFieldFromInput('md_user_id');
        meeting.memberId = populateFieldFromInput('md_member_id');
        meeting.number = populateFieldFromInput('md_number');
        meeting.accessPIN = btoa(populateFieldFromInput('md_access_pin'));
        meeting.moderatorPIN = btoa(populateFieldFromInput('md_moderator_pin'));
        meeting.status = populateFieldFromInput('md_status');
        meeting.serviceTemplateId = populateFieldFromInput('md_serviceTemplateId');
        meeting.servicePrefix = populateFieldFromInput('md_servicePrefix');
        meeting.priority = populateFieldFromInput('md_priority');
        meeting.allowStreaming = populateFieldFromInput('md_allowStreaming_select');
        meeting.streamingStatus = populateFieldFromInput('md_streamingStatus_select');
        meeting.blockDialIn = populateFieldFromInput('md_blockDialIn_checkbox');
        meeting.autoExtend = populateFieldFromInput('md_autoExtend_checkbox');
        meeting.waitingRoom = populateFieldFromInput('md_waitingRoom_checkbox');
        meeting.oneTimePINRequired = populateFieldFromInput('md_oneTimePINRequired_checkbox');
        meeting.conferenceId = populateFieldFromInput('md_conferenceId');
        meeting.description = populateFieldFromInput('md_description');
        var earlyTime = populateFieldFromInput('md_earlyTime');
        if (earlyTime !== '') {
            meeting.earlyTime = new Date(earlyTime).getTime();
        }
        meeting.timeZoneId = populateFieldFromInput('md_timeZoneId');
        meeting.duration = populateFieldFromInput('md_duration');
        meeting.locationId = populateFieldFromInput('md_locationId');
        meeting.testOnly = populateFieldFromInput('md_testOnly_checkbox');
        meeting.sendingNotification = populateFieldFromInput('md_sendingNotification_checkbox');
        meeting.recordingMeetingWhenStart = populateFieldFromInput('md_recordingMeetingWhenStart_checkbox');
        meeting.advancedProperties.durationAfterLeft = populateFieldFromInput('md_durationAfterLeft');
        meeting.advancedProperties.terminationCondition = populateFieldFromInput('md_terminationCondition');
        meeting.advancedProperties.maxParticipants = populateFieldFromInput('md_maxParticipants');
        meeting.daily.numberOfEveryDay = populateFieldFromInput('md_numberOfEveryDay');
        meeting.daily.everyWeekDay = populateFieldFromInput('md_everyWeekDay_checkbox');
        meeting.weekly.numberOfEveryWeek = populateFieldFromInput('md_numberOfEveryWeek');
        meeting.weekly.daysOfWeek = JSON.parse(populateFieldFromInput('md_daysOfWeek'));
        meeting.weekly.numberOfEveryMonth = populateFieldFromInput('md_numberOfEveryMonth');
        meeting.weekly.dayOfMonth = populateFieldFromInput('md_dayOfMonth');
        meeting.weekly.dayOfNumberOfEveryMonth = populateFieldFromInput('md_dayOfNumberOfEveryMonth');
        meeting.recurrenceEnd.endOfOccurrences = populateFieldFromInput('md_endOfOccurrences');
        meeting.recurrenceEnd.by = populateFieldFromInput('md_by');
        meeting.broadcastSetting.subject = populateFieldFromInput('md_broadcast_subject');
        meeting.broadcastSetting.pin = atob(populateFieldFromInput('md_pin'));
        var thumbnail = $('#md_thumbnail_img').attr('src');
        if (thumbnail !== '' && thumbnail !== 'data:;base64,') {
            var mimeType = thumbnail.match(/^data:(\D+);/)[1];
            var base64File = thumbnail.match(/;base64,(.+)/)[1];
            meeting.broadcastSetting.thumbnail = base64File;
            meeting.broadcastSetting.thumbnailMimeType = mimeType;
        }
        meeting.broadcastSetting.profile = populateFieldFromInput('md_profile');
        meeting.broadcastSetting.description = populateFieldFromInput('md_broadcast_description');
        meeting.broadcastSetting.public = populateFieldFromInput('md_public_checkbox');
        meeting.broadcastSetting.questionsAndAnswersEnabled = populateFieldFromInput('md_questionsAndAnswersEnabled_checkbox');
        meeting.broadcastSetting.moderatorPIN = atob(populateFieldFromInput('md_moderatorPIN'));
        meeting.broadcastSetting.programId = populateFieldFromInput('md_programId');
        meeting.broadcastSetting.accessModeSetting.accessMode = populateFieldFromInput('md_accessMode');
        meeting.broadcastSetting.accessModeSetting.userIds = populateFieldFromInput('md_userIds');

        var attendees = [];
        $('#md_attendees').children().each(function() {
            var id = $(this).attr('id');
            if (!id || id.indexOf('md_attendee_container_') < 0) {
                return;
            }

            // get index of element
            var i = parseInt(id.split("md_attendee_container_")[1]);
            var attendee = new AvayaMeetingManagementClient.MeetingManagementService.Meeting.Attendee();

            attendee.firstName = populateFieldFromInput('md_attendee_first_name_' + i);
            attendee.lastName = populateFieldFromInput('md_attendee_last_name_' + i);
            attendee.userId = populateFieldFromInput('md_attendee_user_id_' + i);
            attendee.email = populateFieldFromInput('md_attendee_email_' + i);
            attendee.terminalId = populateFieldFromInput('md_attendee_terminalId_' + i);
            attendee.terminalName = populateFieldFromInput('md_attendee_terminalName_' + i);
            attendee.terminalNumber = populateFieldFromInput('md_attendee_terminalNumber_' + i);
            attendee.protocol = populateFieldFromInput('md_attendee_protocol_' + i);
            attendee.maxBandwidth = populateFieldFromInput('md_attendee_maxBandwidth_' + i);
            attendee.maxISDNBandwidth = populateFieldFromInput('md_attendee_maxISDNBandwidth_' + i);
            attendee.areaCode = populateFieldFromInput('md_attendee_areaCode_' + i);
            attendee.countryCode = populateFieldFromInput('md_attendee_countryCode_' + i);
            attendee.telephoneNumber = populateFieldFromInput('md_attendee_telephoneNumber_' + i);
            attendee.organizer = populateFieldFromInput('md_attendee_organizer_checkbox_' + i);
            attendee.host = populateFieldFromInput('md_attendee_host_checkbox_' + i);
            attendee.restrictedMode = populateFieldFromInput('md_attendee_restrictedMode_checkbox_' + i);
            attendee.threeG = populateFieldFromInput('md_attendee_threeG_checkbox_' + i);
            attendee.voiceOnly = populateFieldFromInput('md_attendee_voiceOnly_checkbox_' + i);
            attendee.needOnMaster = populateFieldFromInput('md_attendee_needOnMaster_checkbox_' + i);
            attendee.autoDialIn = populateFieldFromInput('md_attendee_autoDialIn_checkbox_' + i);

            attendees.push(attendee);
        });
        meeting.attendees = attendees;

        return meeting;
    }

    function addMultivaluedField(element) {
        var newElem = element.elementProto.clone();
        $(element.containerId).append(newElem);

        newElem.find('*').each(function() {
            var id = $(this).attr('id');
            if (id && id.indexOf('_proto') > -1) {
                var newId = id.replace("proto", element.index);
                $(this).attr('id', newId);
                newElem.find('[for="' + id + '"]').attr('for', newId);
            }
        });
        newElem.attr('id', element.elementId.replace('#', ''));

        $(element.title.id).text(element.title.value);
        if (Array.isArray(element.title.bindValueTo)) {
            $(element.title.bindValueTo[0]).change(function() {
                $(element.title.id).text($(element.title.bindValueTo[0]).val() + ' ' + $(element.title.bindValueTo[1]).val());
            });
            $(element.title.bindValueTo[1]).change(function() {
                $(element.title.id).text($(element.title.bindValueTo[0]).val() + ' ' + $(element.title.bindValueTo[1]).val());
            });
        } else {
            $(element.title.bindValueTo).change(function() {
                $(element.title.id).text($(element.title.bindValueTo).val());
            });
        }

        for (var i = 0; i < element.properties.length; i++) {
            if (element.properties[i].type === 'text' || element.properties[i].type === 'checkbox') {
                populateInputWithField(element.properties[i].id, element.properties[i].value);
            } else if (element.properties[i].type === 'select') {
                $('#' + element.properties[i].id + ' option[value="' + element.properties[i].value + '"]').prop('selected', true);
            }
        }

        $(element.expand.buttonId).click($(element.expand.spoilerId), onClickExpandMultivalued);
        $(element.delete.buttonId).click($(element.elementId), onClickDeleteMultivalued);
    }

    function onClickExpandMultivalued(event) {
        var spoiler = event.data;
        if (spoiler.hasClass('hide')) {
            spoiler.removeClass('hide');
        } else {
            spoiler.addClass('hide');
        }
    }

    function onClickDeleteMultivalued(event) {
        event.data.remove();
    }

    function buildElementObject(type, index, data) {
        var element = {
            containerId: '#md_' + type + 's',
            elementId: '#md_' + type + '_container_' + index,
            index: index,
            title: {
                id: '#md_' + type + '_title_' + index,
                bindValueTo: '#md_' + type + '_' + index
            },
            expand: {
                buttonId: '#md_expand_' + type + '_' + index,
                spoilerId: '#md_' + type + '_details_spoiler_' + index
            },
            delete: {
                buttonId: '#md_delete_' + type + '_' + index
            },
            properties: []
        };

        if (type === 'attendee') {
            element.elementProto = $('#md-attendee-container-prototype');
            element.title.value = data.userId !== '' ? (data.firstName + ' ' + data.lastName) : data.terminalName;
            element.title.bindValueTo = data.terminalName === '' ? ['#md_attendee_first_name_' + index, '#md_attendee_last_name_' + index] : '#md_attendee_terminalName_' + index;
            element.properties = [{
                id: 'md_attendee_first_name_' + index,
                value: data.firstName,
                type: 'text'
            }, {
                id: 'md_attendee_last_name_' + index,
                value: data.lastName,
                type: 'text'
            }, {
                id: 'md_attendee_user_id_' + index,
                value: data.userId,
                type: 'text'
            }, {
                id: 'md_attendee_email_' + index,
                value: data.email,
                type: 'text'
            }, {
                id: 'md_attendee_organizer_checkbox_' + index,
                value: data.organizer,
                type: 'checkbox'
            }, {
                id: 'md_attendee_host_checkbox_' + index,
                value: data.host,
                type: 'checkbox'
            }, {
                id: 'md_attendee_terminalId_' + index,
                value: data.terminalId,
                type: 'text'
            }, {
                id: 'md_attendee_terminalName_' + index,
                value: data.terminalName,
                type: 'text'
            }, {
                id: 'md_attendee_terminalNumber_' + index,
                value: data.terminalNumber,
                type: 'text'
            }, {
                id: 'md_attendee_protocol_' + index,
                value: data.protocol,
                type: 'text'
            }, {
                id: 'md_attendee_maxBandwidth_' + index,
                value: data.maxBandwidth,
                type: 'text'
            }, {
                id: 'md_attendee_maxISDNBandwidth_' + index,
                value: data.maxISDNBandwidth,
                type: 'text'
            }, {
                id: 'md_attendee_areaCode_' + index,
                value: data.areaCode,
                type: 'text'
            }, {
                id: 'md_attendee_countryCode_' + index,
                value: data.countryCode,
                type: 'text'
            }, {
                id: 'md_attendee_telephoneNumber_' + index,
                value: data.telephoneNumber,
                type: 'text'
            }, {
                id: 'md_attendee_restrictedMode_checkbox_' + index,
                value: data.restrictedMode,
                type: 'checkbox'
            }, {
                id: 'md_attendee_threeG_checkbox_' + index,
                value: data.threeG,
                type: 'checkbox'
            }, {
                id: 'md_attendee_voiceOnly_checkbox_' + index,
                value: data.voiceOnly,
                type: 'checkbox'
            }, {
                id: 'md_attendee_needOnMaster_checkbox_' + index,
                value: data.needOnMaster,
                type: 'checkbox'
            }, {
                id: 'md_attendee_autoDialIn_checkbox_' + index,
                value: data.autoDialIn,
                type: 'checkbox'
            }];
        }

        return element;
    }

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
                parameters.headers.Authorization = 'UPToken ' + token;
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

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function logWidget() {
        var logMsgCounter = 0;
        var logContainer = $('#logs'),
            logMsgPrototype = $('#log-msg-prototype');

        function createLogMsgDOMElement(message) {
            var logMsg = logMsgPrototype.clone();
            logMsg.removeAttr('id');
            logMsg.attr('id', 'log-msg-' + (++logMsgCounter));

            logMsg.find('.msg-text').text(message);

            var li = $('<li/>');
            li.append(logMsg);
            return li;
        }

        function log(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message));
        }

        function warn(message) {
            message = (new Date()).toLocaleTimeString() + ': ' + message;
            logContainer.prepend(createLogMsgDOMElement(message));
        }

        return {
            log: log,
            warn: warn
        };
    }

})(jQuery, window);
