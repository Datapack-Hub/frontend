<script lang="ts">
  import MarkdownComponent from "$lib/components/markdown/MarkdownComponent.svelte";

  let source = `

  # Datapack Hub Privacy Policy
  Datapack Hub ("we," "us," or "our") is committed to protecting the privacy of our users ("you" or "your"). We collect minimal data about you, and the data we do collect is only used to make our Website function. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website, datapackhub.net ("Website").

## Information We Collect
### 1.1 Account Registration Information
When you create an account on our Website, we collect the following information from you:

- Username: We collect your chosen username for identification purposes within our platform.
- Profile Icon: We collect the profile icon you choose to personalize your account.
- GitHub ID: We collect your GitHub ID solely for the purpose of facilitating login to our Website using your GitHub credentials.

### 1.2 Cookies
We use a single cookie to enable the login functionality on our Website. This cookie is essential for you to log into the site and does not collect any personal information beyond the necessary authentication data.

## Use of Information
### 2.1 Account Information
We use the account information collected during registration (username, profile icon, and GitHub ID) solely for the purpose of identifying you within our platform and providing personalized services. We do not share this information with any third parties unless required by law or with your explicit consent.

### 2.2 Project Information
The projects you create on our Website may be displayed publicly and may include your username and profile icon for attribution purposes.

### 2.3 Cookies
The cookie stored on your device is used solely for the purpose of facilitating your login and ensuring a seamless user experience on our Website.

## Data Retention
We retain your account information (username, profile icon, and GitHub ID) for as long as your account remains active. Upon your request, we will delete your account and project information from our systems.

## Data Security
We take appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

## Your Rights and Choices
You have the right to:

- Access, update, or correct your account information by logging into your account settings.
- Request the deletion of your account information by contacting us on Discord.
- Object to the processing of your account information for legitimate reasons.
- Withdraw your consent to the collection and processing of your account information, although this may result in the termination of your account and inability to access certain features of our Website.
- Third-Party Websites
- Our Website may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of those third parties before providing any personal information or using their services.

## Children's Privacy
Our Website is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove that information from our servers.

## Changes to This Privacy Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. It is your responsibility to review this Privacy Policy periodically for any changes.

## Contact Us
If you have any questions or concerns about this Privacy Policy or our data practices, please contact us on Discord.`;
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
</svelte:head>

<main
  class="bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="pt-20"></div>
  <MarkdownComponent source="{source}" />
  <div class="pb-10"></div>
</main>
