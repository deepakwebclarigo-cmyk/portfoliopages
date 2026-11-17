# Exact duplicate image cleanup

Only byte-identical image data was consolidated. Unreferenced audit copies were deleted; required website, export and referenced audit paths use NTFS hard links to the retained image. Responsive sizes and distinct versions are unchanged.

See cleanup-report.json for every removed path, its retained original, and SHA-256. Deleted paths can be restored by copying their retained original. When independently editing a shared image later, write a new file and rename it over that path instead of modifying the linked file in place.
