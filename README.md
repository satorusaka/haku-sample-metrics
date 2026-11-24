# Haku sample storage metrics extension

This Haku extension bundles a read-only HTTP JSON connector and a storage metrics widget. The bundled fixture supplies sample measurements in GiB.

## Try the extension

1. Discover **Sample storage metrics** in the [Haku extension catalog](https://github.com/satorusaka/haku-extension-catalog), or add this repository as a custom source in Haku.
2. Install the release. Start the fixture with Node.js 24 using a private LAN IP that Haku can reach.

   ```sh
   HAKU_METRICS_HOST=192.168.1.10 node provider.mjs
   ```

3. Configure the connection with the fixture's full URL, such as `http://192.168.1.10:8780/metrics`, and explicitly allow the private endpoint. Set `HAKU_METRICS_TOKEN` if you want the fixture to require a bearer token.
4. Share a metric with a Space, then bind the storage metrics widget to that resource.

Change the example IP to an address on your machine. The fixture serves hardcoded sample data. The optional token belongs in the connection configuration.

The provider supplies fields for both published releases. The extension keeps the same package, widget, and provider keys across them. See the [releases](https://github.com/satorusaka/haku-sample-metrics/releases) for the version history.
