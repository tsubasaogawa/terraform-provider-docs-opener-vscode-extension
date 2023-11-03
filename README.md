# terraform-provider-docs-opener-vscode-extension

Yes. It is just an extension that opens the terraform document page in the browser that you're highlighting, that's all.

![Demo](https://github.com/tsubasaogawa/terraform-provider-docs-opener-vscode-extension/assets/7788821/5e7e423b-87e7-4c24-97fc-ac8b6a41c543)

## Settings

You can change some parameters in your settings.json.

```json
    "tfpd_opener.fqdn": "registry.terraform.io",
    "tfpd_opener.paths": {
        "aws": "providers/hashicorp/aws/latest/docs/resources",
        "google": "providers/hashicorp/google/latest/docs/resources",
        // "foo_provider": "path/to/foo"
    },
```

## Future Works

- Not only `resource` but `data`
