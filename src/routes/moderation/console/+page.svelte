<script lang="ts">
    import { onMount } from "svelte";
    import ButtonPrimary from "$components/buttons/ButtonLink.svelte";
    import anime from "animejs/lib/anime.es";
  
    let rand = Math.floor(Math.random() * 10_000_000);
    let formattedRand = Intl.NumberFormat("en", {
      notation: "compact",
    }).format(rand);
  
    let visible = false;
  
    onMount(async () => {
      let textWrapper = document.querySelectorAll(".split-text .letters");
      textWrapper.forEach((el) => {
        el.innerHTML = el.textContent!.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
      });
  
      anime
        .timeline({ loop: true, autoplay: true })
        .add({
          targets: "#indexText1 .letter",
          translateY: ["1.1em", 0],
          duration: 750,
          delay: (el, i) => 50 * i,
        })
        .add({
          targets: "#indexText1",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        })
        .add({
          targets: "#indexText2 .letter",
          translateY: ["1.1em", 0],
          duration: 750,
          delay: (el, i) => 50 * i,
        })
        .add({
          targets: "#indexText2",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        })
        .add({
          targets: "#indexText3 .letter",
          translateY: ["1.1em", 0],
          duration: 750,
          delay: (el, i) => 50 * i,
        })
        .add({
          targets: "#indexText3",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        });
      visible = true;
    });
  </script>
  
  <svelte:head>
      <title>Datapack Hub</title>
  </svelte:head>
  
  <main class="min-h-screen">
    <h1>hi</h1>
  </main>
  