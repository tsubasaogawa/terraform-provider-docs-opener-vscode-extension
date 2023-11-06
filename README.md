# terraform-provider-docs-opener-vscode-extension

Yes. It is just an extension that opens the terraform document page in the browser that you're highlighting, that's all.

![Demo](./doc/demo.gif)

## Settings

You can change some parameters in your settings.json.

```json
    "TFDocsOpener.fqdn": "registry.terraform.io",
    "TFDocsOpener.paths": {
        "aws": "providers/hashicorp/aws/latest/docs/resources",
        "google": "providers/hashicorp/google/latest/docs/resources",
        // "foo_provider": "path/to/foo"
    },
```

## Key Binding

It can also run with `Alt + Shift + T`

## Future Works

- Not only `resource` but `data`, or `function` (Terraform)
