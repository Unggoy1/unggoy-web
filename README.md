# Unggoy Web

[Discord Server](https://discord.gg/xnwFA4z2HA)

Unggoy is a a web app to browse Halo Infinite user generated content(maps, modes, prefabs), and allows users to create and share playlists with the content.

## Screenshots

![Screenshot 1](/screenshots/screenshot1.png)

![Screenshot 2](/screenshots/screenshot2.png)

## Requirements

- [Bun js runtime](https://bun.sh/) (NodeJs should work, but my production deployment had issues with building, so i just stuck with bun which i use in development)
- [Unggoy Api](https://github.com/Unggoy1/unggoy-api)

Currently running your own instance of the backend is required to get this project working. No data is provided with the backend.
My goal is to eventually have a sizable static dataset to use for partial frontend development. I currently lack the knowledge to implement this.

## Run Locally

Clone and go to the repo in your terminal. then do the following:

```bash
# bun should be replacable with npm, pnpm, or yarn
bun install

bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Configuration

Explain any configuration options or customizations available in the project.

## Running Tests

Currently the project has no tests. I am mainly a backend developer and learned SvelteKit specifically for this project.
If any knowledgeable front end developers want to contribute with some tests it would be appreciated.

## Contributing

We’re thrilled that you’re interested in contributing to our project! Here’s how you can get involved:

### How to Contribute

1. **Submit Issues**:

   - If you encounter any bugs or have suggestions for improvements, please submit an issue on our [GitHub Issues](https://github.com/Unggoy1/unggoy-web/issues) page.
   - Provide as much detail as possible, including steps to reproduce and screenshots if applicable.

2. **Propose Features**:

   - Have a great idea for a new feature? Open a feature request issue in the same [GitHub Issues](https://github.com/your-repo/issues) page.
   - Describe the feature in detail and explain how it will benefit the project.

3. **Submit Pull Requests**:
   - Fork the repository and create a new branch for your changes.
   - Make your modifications and test thoroughly.
   - Open a pull request against the `main` branch of the original repository. Include a clear description of your changes and any relevant context.

You can also join our discord linked at the top of the readme to report bugs and propose new features.

### Getting Help

If you have any questions or need assistance, feel free to reach out to us via [GitHub Discussions](https://github.com/your-repo/discussions) or contact us directly at [email@example.com](mailto:email@example.com).

Thank you for your interest in contributing! Your involvement helps make this project better for everyone.

## Notice

I am not very knowlegeable in front end development especially with proper programming conventions with SvelteKit. I am fully open to any contributions, feedback, and anything related to the code

This project was made because my passion for Halo Infinite, and wanting to make some features I wished existed in the game or on halo waypoint.

## Support

Need help? Join the discord linked at the top of the readme
