# Image organization audit

The audit inspected 3,479 project image paths and successfully decoded all 2,878 unique contents. File signatures were also checked for image backups with unusual extensions. Dependency images, Git object storage, and generated Next.js build directories are managed separately.

73 unnecessary byte-identical copies were removed. This includes the redundant nested extraction of the 1,000px logo collection. Every unique image content remains available. Different resolutions, formats, metadata variants, and design versions were retained; 61 groups with equal decoded pixels were reviewed and preserved as distinct encoded versions.

436 unreferenced review images were moved, without recompression, into `../../asset-library/reviews/`. Explicit project filenames are grouped by the current project slug; shared reviews are grouped by their original review phase. Production URLs, source masters, and the 2,970 protected image paths retain their original bytes and locations. Required identical paths may still share filesystem storage.

## Records

- `inventory-before.json`: all image paths, content hashes, and shared-storage identifiers before organization.
- `image-inspection.json`: dimensions, formats, alpha information, decoded-pixel hashes, and inspection results.
- `organization-plan.json`: protected images and the exact reviewed changes.
- `organization-report.json` and `organization-journal.jsonl`: completed operations and content-preservation checks.
- `image-catalog.json`: remaining images and their metadata.
- `relocation-map.json`: original and current paths for moved review images.
- `text-backups/`: original authoring metadata and ignore rules before their reference updates.
- `authoring-reference-verification.json`: all 84 logo paths verified against their pre-organization bytes.

A removed copy can be restored from its recorded `keep` image. Moved files can be returned using the relocation map. The journal records SHA-256 checksums for both operations.

The historical color-only freeze checker predates later approved layout work and reports its old `app/layout.tsx` baseline. The current application layout is unchanged from the pre-organization Git commit. Current asset checks and a fresh production build validate this cleanup independently.
