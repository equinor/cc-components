# Shared library
This library consists of common utilities and components that other libraries and apps can consume from. If there are types, utils, mappings or components that are replicated across applications, it should probably belong in this library. 

Utility functions should be put inside their own folders and folder name should be prefixed with `utils`. For example `utils-dates` which contains different utility functions for formatting date objects and date strings.

Mapping conists of different records and enums. For example, mapping statuses to a specific color. Usually we want to use the same color across the different applications if the same statuses are used.

Types are a collection of mostly general types that are used across applications and libraries.
