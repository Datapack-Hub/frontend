<script lang="ts">
  import MarkdownComponent from "$lib/components/markdown/MarkdownComponent.svelte";

  let source = `# Datapack Hub Rules
We want to make sure that Datapack Hub is safe for everyone to use!
To ensure that Datapack Hub stays clean and safe, please make sure to follow these simple rules!

### Submission Rules
When you post a submission, it will be reviewed by our moderators to make sure it follows these rules.
#### Do not:
- **Post malware.** This is self explanatory - if you post malware instead of an actual datapack, then you will be blocked from visiting the site.
- **Take work from others**. Please only post content that you made yourself, or you have permission to upload.
- **Post inappropriate submissions**. All datapacks on Datapack Hub must be appropriate for all ages. NSFW content will not be tolerated.
- **Spam**. Make sure that content you post has value and has a description/images so people know what your datapack does.
- **Post solely to advertise a commercial product**. You are allowed to promote, however it shouldn't distract users from your project.

#### "Low Quality datapacks"
All datapacks should have some sort of value. If all your datapack does is change one recipe or loot table, then it probably won't be approved.

## Reporting and Moderation
If you find a submission that you think breaks the rules, then please report it. A moderator will review your report and take action.

### Reporting rules and guidelines
- **Include evidence**. A report that just says \`This is stolen\` is completely useless unless you tell us where they stole it from.
- **Do not just report content that you do not like**. Reporting should only be used when it breaks one of our rules.
- **Repeatedly report content**. If the moderators choose not to delete a project, then that is their choice. If you repeatedly report a user because you don't like them, you could be banned.

### Moderation
If you break our rules, then our moderators will take appropriate action. This includes, but is not limited to:
- **Warning** - This does not affect you or your content in any way.
- **Project Disabled** - You will be able to edit your project, and then submit it for approval by a moderator.
- **Project Deletion** - If the problem can't be fixed by an edit (i.e. stolen, spam, malware) then the project will be deleted.
- **Account Ban** - This will prevent you from posting or editing any submissions
- **Account Termination** - For serious infractions, you will be locked out of your account.

These might seem scary, but if you follow the rules, then you will have no need to worry.
We also won't ban you for a small infraction if you only do it once. Everyone makes mistakes :P

---

Revision 1`;
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
</svelte:head>

<main
  class="bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="pt-20"></div>
  <MarkdownComponent source="{source}" />
  <div class="pb-64"></div>
</main>
