# Open MCT Integration Tutorials

These tutorials will walk you through the simple process of integrating your telemetry systems with Open MCT.  In case you don't have any telemetry systems, we've included a reference implementation of a historical and realtime server.  We'll take you through the process of integrating those services with Open MCT.

## Tutorial Prerequisites

* [node.js](https://nodejs.org/en/)
    * Mac OS: We recommend using [Homebrew](https://brew.sh/) to install node.
    ```
    $ brew install node
    ```
    * Windows: https://nodejs.org/en/download/
    * linux: https://nodejs.org/en/download/
* [git](https://git-scm.com/)
    * Mac OS: If XCode is installed, git is likely to already be available from your command line. If not, git can be installed using [Homebrew](https://brew.sh/).
    ```
    $ brew install git
    ```
    * Windows: https://git-scm.com/downloads
    * linux: https://git-scm.com/downloads

Neither git nor node.js are requirements for using Open MCT, however this tutorial assumes that both are installed. Also, command line familiarity is a plus, however the tutorial is written in such a way that it should be possible to copy-paste the steps verbatim into a POSIX command line.

## Installing

```
git clone https://github.com/nasa/openmct-tutorial.git
cd openmct-tutorial
npm install
npm start
```
