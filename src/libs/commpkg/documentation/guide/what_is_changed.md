{{= BackToPackageOverview }}

# What's Changed in the Release

## What's Changed in the 3.2 Release

### The onConferenceStarting callback execution

In prior versions of the CSDK, the callback function *onConferenceStarting* in the {{=Services_Conference_Conference}} object was executed when:

* The Conference started in waiting-room state.
* The Conference went out of waiting-room state and became active.

Starting in this release:

* When the Conference starts in waiting-room state the callback function *onConferenceWaitingToStart* will instead be executed.
* When the Conference leaves waiting-room state and becomes fully active the callback function *onConferenceStarting* will still be executed.
