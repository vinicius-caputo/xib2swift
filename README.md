# Xib2ViewCode

The xib2viewcode is a tool to convert xib files that created by Interface Builder to swift code. 

By deafult apple wants to make you use storyboard and xib files, but acros the years the way the community make their projects in most cases dont use storyboard, they prefer to write the UI code in swift, because it is more readable and maintainable, and has better build time.

This tool wants to help to migrate projects from storyboard to swift code, and make possibile to build the UI in Interface Build and convert it to swift code.

# Quick links
[How to use](#how-to-use)
[How it works](#how-it-works)
[How to contribute](#how-to-contribute)
[Found a Bug?](#issue)
[Submitting an Issue](#submit-issue)
[Submitting a Pull Request (PR)](#submit-pr)

# <a name="how-to-use"></a> How to use 

The simplest way to use this tool is to use the is acessing the [online converter website](https://vinicius-caputo.github.io/xib2viewcode/), paste de xib code in the left text area and click in the button "Convert", the result will be shown in the rigth text area.

In other way you can clone this repository and a use npm install to install the dependencies, you can use the xib2viewcode function in the src/index.ts to convert the xib code to swift code. It takes a string with the xib code and returns a string with the swift code.

# <a name="how-it-works"></a> How it works

In the index.ts are a function called xib2viewcode, this function takes a string with the xib code and returns a string with the swift code. 

This function do 4 main steps to convert the xib code to swift code, and each step has a class that do the job:

1. XibManipulator thats parse the xib and get the interesting information to convert to swift code, like outlets, actions, constraints, ui elements.
2. UIDeclationsGen, recive the UI elements tags, like UILabel, UIButton, interprets and generate the swift code for then, this class heavily use the rules.ts file to generate the code, because the way the xib is written is not the same way the swift code is, and the file has the rules to convert the code.
3. ConstraintsGen that generate the swift code for the constraints, do some verification to indetify witch constant type the constraint is, and generate the code.
4. ViewHierarchyGen that generate the swift code for the view hierarchy, takes the subviews and generate the code to add the subviews in the correct order.

The website code is in the website folder, and is a simple htlm page, to use the xib2viewcode function and show the result in the browser. It use the webpack to bundle the main.ts that import the xib2viewcode function to do the conversion. And every time you change the code in the src folder in your machine you need to run "npm run build", then the webpack will bundle the code and update the bundle.js file in the website folder.

# <a name="how-to-contribute"></a> How to contribute

First of all, thank you wanting for contributing to this project!
There are some guidelines that we need contributors to follow so that we can have a chance of keeping on top of things.

The are open issues in the [issue tracker](https://github.com/vinicius-caputo/xib2viewcode/issues) that you can work on, or you can create a new issue if you find a bug or have a feature, improvement or refactoring suggestion see the [issue section](#issue) for more details.

After a merge request is accepted, the github actions will the build, the github actions will publish a new version of online converter website.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue) to our [GitHub Repository][github].
Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the [issue tracker](https://github.com/vinicius-caputo/xib2viewcode/issues). An issue for your problem might already exist and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing, we need to reproduce and confirm it. In order to reproduce bugs, we require that you provide a minimal way to reproduce then. Having a live, reproducible scenario gives us wealth of important information without going back & forth to you with additional questions.

Writte the issue in english, and try to be as descriptive as possible, and if you can, add a code example or a link to a repository that reproduces the problem.

If you want a new feature is important to describe the problem or the feature that you want to solve, and if you can, add a code example or a link to a repository that reproduces the problem.

Additionally, is important to tag the issue with the correct label, to help us to identify the type of issue see the [labels section](https://github.com/vinicius-caputo/xib2viewcode/labels) to see the list of labels that match the type of issue.

## <a name="submit-pr"></a> Submitting a Pull Request (PR)

Depending on the type of change that you're committing, please add one of the following strings at the beginning of your commit messages:

[feature] - for new features
[improvement] - for improvements to existing features
[fix] - for bug fixes
[docs] - for changes and additions to the documentation
[refactoring] - for refactoring the code, formatting, missing semi colons, no functional changes
[website] - for changes to the website

Is necessary to add a description of the change in the commit message, and if you are fixing a issue, add the issue number in the commit message, like the pattern:

[fix] - fix the bug #1.

## Tank you for reading this, and I hope you enjoy this project!