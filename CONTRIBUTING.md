# Contribution Guide

Thank you for contributing to the stumpfi project, your help is greatly appreciated !
In ordrer to keep this open-source project clear and make the contribution process as easy as possible, please read this contribution guide and follow the described guidelines (this is still a work in progress, feel free to suggest improvements so the stumpfi community can work even better together) !



## Table of Contents

[Semantic Versioning](#semantic-versioning)

[Branch organization](#branch-organization)

[Contacts](#contacts)

[Labels naming convention](#labels-naming-convention)
 * [Type](#type)
 * [Status](#status)
 * [Difficulty](#difficulty)

[Reporting bugs](#reporting-bugs)

[Proposing changes](#proposing-changes)

[Pull Requests](#pull-requests)
 * [Naming convention](#naming-convention)
 * [Prerequisities](#prerequisities)

[Development workflow and tools](#development-workflow-and-tools)

[Guidelines](#guidelines)
 * [Typescript](#typescript)
 * [Git commits](#git-commits)

[Project structure](#project-structure)

[License](#license)



## Semantic Versioning

stumpfi-io follows [semantic versioning](https://semver.org/). We release patch versions for bugfixes, minor versions for new features, and major versions for any breaking changes.



## Branch organization

To come.



## Contacts

To come.



## Labels naming convention

In order to improve issues management and to make information clearer and easily identifiable, a set of pre-defined labels has been created. Those labels are strictly structured in three main groups, each group giving a particular useful information about the issue. This means that for each issue you open, you must assign it exactly one label of each group, and update them all along the issue's lifecycle as it evolves.

### Type
 - ![#fbca04](https://placehold.it/15/fbca04/000000?text=+) **[type: breaking change](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20breaking%20change)** : suggestion for a breaking change, that should be part of a next major release.
 - ![#b60205](https://placehold.it/15/b60205/000000?text=+) **[type: bug](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20bug)** : bug reporting, that should be fixed in the next patch.
  - ![#d93f0b](https://placehold.it/15/d93f0b/000000?text=+) **[type: regression](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20regression)** : just like bug, except it just showed up in the last release, and should be fixed in the next patch.
 - ![#0052cc](https://placehold.it/15/0052cc/000000?text=+) **[type: enhancement](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20enhancement)** : improvement that should be implemented in the next patch.
 - ![#5319e7](https://placehold.it/15/5319e7/000000?text=+) **[type: feature](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20feature)** : request for a new feature, that should be added in the next minor release.
 - ![#0e8a16](https://placehold.it/15/0e8a16/000000?text=+) **[type: question](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20question)** : question or request for information, which can also help us to improve the documentation.
  - ![#006b75](https://placehold.it/15/006b75/000000?text=+) **[type: discussion](https://github.com/matthieujabbour/stumpfi-io/labels/type%3A%20discussion)** : everything else you want to discuss about regarding the project !

### Status
 - ![#d4c5f9](https://placehold.it/15/d4c5f9/000000?text=+) **[status: duplicate](https://github.com/matthieujabbour/stumpfi-io/labels/status%3A%20duplicate)** : another existing issue is treating about the same topic, and should be considered instead. 
 - ![#c2e0c6](https://placehold.it/15/c2e0c6/000000?text=+) **[status: in progress](https://github.com/matthieujabbour/stumpfi-io/labels/status%3A%20in%20progress)** : somebody is currently working on this issue, and should (hopefully) perform a PR soon !
 - ![#e99695](https://placehold.it/15/e99695/000000?text=+) **[status: invalid](https://github.com/matthieujabbour/stumpfi-io/labels/status%3A%20invalid)** : issue is either dead, not reproductible, or does not follow the process, and will be closed soon.
 - ![#f9d0c4](https://placehold.it/15/f9d0c4/000000?text=+) **[status: need more information](https://github.com/matthieujabbour/stumpfi-io/labels/status%3A%20need%20more%20information)** : issue is too vague and cannot be managed without further information.
 - ![#c5def5](https://placehold.it/15/c5def5/000000?text=+) **[status: new](https://github.com/matthieujabbour/stumpfi-io/labels/status%3A%20new)** : issue was just submitted, and should be assigned to someone ASAP.
 - ![#fef2c0](https://placehold.it/15/fef2c0/000000?text=+) **[status: unconfirmed](https://github.com/matthieujabbour/stumpfi-io/labels/status%3A%20unconfirmed)** : issue should be considered carefully to determine either it is a real issue or anything else.

### Difficulty
 - ![#3ddb42](https://placehold.it/15/3ddb42/000000?text=+) **[difficulty: starter](https://github.com/matthieujabbour/stumpfi-io/labels/difficulty%3A%starter)** : issue is pretty straightforward, and can be fixed by anyone (good first issue).
 - ![#ea6641](https://placehold.it/15/ea6641/000000?text=+) **[difficulty: medium](https://github.com/matthieujabbour/stumpfi-io/labels/difficulty%3A%medium)** : issue is a bit complex, and requires some knowledge about the project.
 - ![#c13c5b](https://placehold.it/15/c13c5b/000000?text=+) **[difficulty: challenging](https://github.com/matthieujabbour/stumpfi-io/labels/difficulty%3A%20challenging)** : issue is very complex, and requires both good skills and a deep knowledge of the project.



## Reporting bugs

If you think you found a bug in the code, you can open an issue to report it, so the community can then work to fix it ! Before opening a new issue, make sure the topic is not already being discussed in another issue, to prevent duplicates. Try to be as clear and exhaustive as possible, so people can quickly understand what is going on. You can use the following guideline :

 * **Issue title** explaining the bug in a small and concise sentence.
 * **Version** on which you are experiencing the bug.
 * **Test case** to reproduce the bug. You can link a [JSFiddle](https://jsfiddle.net/), [JSBin](https://jsbin.com/), [CodePen](https://codepen.io/#) or any other code snippet to help !
 * **Steps to reproduce** if you don't have any test case link, you can provide a step-by-step process to reproduce the bug.
 * **Expected behaviour** describing what should normally happen.
 * **Actual behaviour** describing what actually happens.
 * **Additional information** like comments, images, GIFs, anything that can help community to correct the issue...

Of course, don't forget to set the correct labels to your issue !



## Proposing changes

As for bugs, feel free to suggest any interesting improvement or new feature, to make this project live ! Again, before opening this kind of request, make sure it is not already a work in progress by checking first the issues list. You can as well use a similar guideline as the one describe before to make a new request. Just keep in mind that other contributors have to understand your idea to put it into code.


## Pull Requests

Ready to contribute to the code ? That's great, thank you and welcome in the contributors team ! You can now open a new pull request to propose your code to the community.

### Naming convention

When making a new pull request, you should give it a name that allows moderators to quickly and easily have a clear vision of what your request is about and what it contains. To do so, you can name your pull request to the ID of the issue it corrects, e.g. `#164`. This way, everyone can access the whole discussion and get all the details. Furthermore, you can add extra information in the pull request description, that would not be present in the issue's thread. And as usual, don't forget the labels !

### Prerequisities

To technically contribute to this project, here are the software you will need :
 * A terminal and an IDE ;)
 * [git](https://git-scm.com/), version 2^
 * [yarn](https://yarnpkg.com/fr), version 1^
 * [nodeJS](https://nodejs.org/en), version 6^
 * [npm](https://www.npmjs.com), version 3^


## Development workflow and tools

```bash
git clone https://github.com/matthieujabbour/stumpfi-io.git
cd stumpfi-io
yarn install
yarn run start
yarn run test
yarn run build
yarn run doc
```


## Guidelines

### Typescript

stumpfi Typescript codebase follows the [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript), adapted to Typescript specificities of course. We implemented a [dedicated TSLINT module](https://github.com/matthieujabbour/tslint-config-stumpfi) to perform linting for that.

### Git commits

To provide good and clear git commit messages, you can follow [this guideline](https://chris.beams.io/posts/git-commit/).


## Project structure

To come.


## License

[MIT](https://github.com/matthieujabbour/stumpfi-io/blob/master/LICENSE)

Copyright (c) 2017 - present, Matthieu Jabbour.

