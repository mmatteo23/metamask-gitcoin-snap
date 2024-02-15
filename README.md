<div id="logo" align="center" style="width: 100px;">

  <a href="https://www.gitcoin.co/passport">

  ![Passport logo](https://assets-global.website-files.com/6433c5d029c6bb75f3f00bd5/64e62b457ae551fc732123e5_passport-backround-logo.svg)

  </a>
  <h1>
	  Gitcoin Passport Analytics Snap
  </h1>
  
</div>

<h6 align="center">
  <a href="https://gitcoin-metamask-snap-site.vercel.app">Website</a>
  ·
  <a href="https://paragraph.xyz/@midena.eth">Blog</a>
</h6>

<p align="center">
	<a href="https://github.com/mmatteo23/metamask-gitcoin-snap/stargazers">
		<img alt="Stargazers" src="https://img.shields.io/github/stars/mmatteo23/metamask-gitcoin-snap?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIiB2aWV3Qm94PSIwIDAgNjQwIDY0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggc3R5bGU9InN0cm9rZTojNWZiYjBjO3N0cm9rZS13aWR0aDowO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7ZmlsbDojZmZkMzU5O2ZpbGwtcnVsZTpub256ZXJvO29wYWNpdHk6MSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSguMDA0IDE1LjY2Nikgc2NhbGUoMTUuOTgyMjMpIiBkPSJtMjAuMDIyIDAgNS45NCAxMi44NzcgMTQuMDgyIDEuNjctMTAuNDExIDkuNjI4IDIuNzY0IDEzLjkxLTEyLjM3NS02LjkyNy0xMi4zNzQgNi45MjcgMi43NjQtMTMuOTFMMCAxNC41NDdsMTQuMDgzLTEuNjd6Ii8+PC9zdmc+&color=FFE7A6&labelColor=302D41"></a>
	<a href="https://npmjs.com/package/@midenaeth/gitcoin-analytics-snap">
		<img alt="NPM Release" src="https://img.shields.io/npm/v/@midenaeth/gitcoin-analytics-snap.svg?style=for-the-badge&logo=npm&color=FA4B4B&logoColor=AE0000&labelColor=302D41"/></a>
  <a href="https://twitter.com/mmidena23">
    <img alt="Twitter" src="https://img.shields.io/twitter/follow/mmidena23?color=%2338B3FF&label=twitter&logo=Twitter&style=for-the-badge"></a>
</p>

<p align="center">· &nbsp&nbsp&nbsp· &nbsp&nbsp&nbsp·</p>

<p align="center">
Enabling <b>KYR (Know Your Receiver)</b> transactions. Get stats on who you're sending money to directly on Metamask.
</p>

<p align="center">· &nbsp&nbsp&nbsp· &nbsp&nbsp&nbsp·</p>

# Features

Using Gitcoin Snap you can have stats about receiver of your transactions. Currently supported features:

- **Gitcoin Score:** the snap shows the address's score
- **Stamps grouped by Platforms:** the snap shows a list of stamps based on the platform/issuer that have released them.

# Development

### Prerequisites

- [MetaMask Flask](https://docs.metamask.io/snaps/get-started/install-flask/)
  - ⚠️ You need a version of MetaMask that supports Snaps
- Node.js `18`. I **strongly** recommend you install via [NVM](https://github.com/creationix/nvm) to avoid incompatibility issues between different node projects.

## Running

- Run `yarn install`
- Run `yarn build`
- Run `yarn start`
