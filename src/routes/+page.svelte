<script>
  import mugImg from "$lib/images/mug.png";
  import cassetteImg from "$lib/images/cassette.webp";
  import pillowImg from "$lib/images/pillow.png";
  import nightcapImg from "$lib/images/nightcap.webp";
  import sojuImg from "$lib/images/soju.png";

  let submitting = false;
  let submitted = false;
  let message = "";

  async function handleSubmit(event) {
    event.preventDefault();
    submitting = true;
    const formData = new FormData(event.target);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      message = result.message;
      submitted = true;
    } catch (error) {
      console.error("error submitting form:", error);
      message = "an error occurred while submitting the form. just text me instead idk.";
    } finally {
      submitting = false;
    }
  }
</script>

<div class="container">
  <img src={mugImg} alt="mug" class="hanging mug" />
  <img src={cassetteImg} alt="cassette" class="hanging cassette" />
  <img src={pillowImg} alt="pillow" class="hanging pillow" />
  <img src={nightcapImg} alt="nightcap" class="hanging nightcap" />
  <img src={sojuImg} alt="soju" class="hanging soju" />
  <h1>matthew's lazy bday 2024</h1>
  <p>july 12, 2024 - 7pm</p>
  <p>location: my house (SFU)</p>
  <h3>featuring:</h3>
  <ul>
    <li>sushi</li>
    <li>snacks + drinks</li>
    <li>
      music <a
        target="_blank"
        href="https://open.spotify.com/playlist/1DthM7wM3S8xcCMJ4z7jUE?si=daeb9f50d9574482&pt=ec49eef9627f3a7fdf7113047510909b"
        >(add to playlist)</a
      >
    </li>
    <li>games</li>
    <li>degenerate midnight a&w order</li>
  </ul>
  <h3>bring:</h3>
  <ul>
    <li>yourself</li>
    <li>your favourite midnight snack</li>
    <li>your comfiest pyjamas</li>
  </ul>
  <h3>RSVP</h3>
  <form class="form" on:submit={handleSubmit}>
    <label for="name">name</label>
    <input type="text" id="name" name="name" required />
    <label for="email">email</label>
    <input type="email" id="email" name="email" required />
    <div>
      <label for="parking">need parking?</label>
      <input type="checkbox" id="parking" name="parking" />
    </div>
    <button disabled={submitted || submitting} type="submit">{submitted ? "submitted" : submitting ? "submitting..." : "submit"}</button>
    {#if message}
      <p>
        {#each message.split("") as c, i}
          <span class="oscillate" style:animation-delay={`-${i * 0.1}s`}>{c}</span>
        {/each}
      </p>
    {/if}
  </form>
</div>

<style>
  :global(body) {
    margin: 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    text-shadow: 0px 0px 8px white;
    overflow: hidden;
    min-height: 100vh;
    padding-top: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form button {
    margin-top: 1rem;
  }

  .hanging {
    position: absolute;
    animation-name: orbit;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    pointer-events: none;
  }

  .mug {
    transform: translate(0, -256px) scale(0.5);
  }

  .cassette {
    transform: translate(0, 128px) scale(0.7);
    animation-delay: -4s;
  }

  .pillow {
    transform: scale(0.6);
    animation-delay: -8s;
  }

  .nightcap {
    transform: translate(0, -64px) scale(0.5);
    animation-delay: -12s;
  }

  .soju {
    transform: translate(0, 256px) scale(0.8);
    animation-delay: -16s;
  }

  .oscillate {
    white-space: pre;
    animation-name: oscillate;
    animation-duration: 2.4s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    display: inline-block;
  }

  @keyframes orbit {
    0% {
      translate: -60% 50%;
      z-index: -4;
      opacity: 1;
      scale: 1;
    }
    25% {
      filter: blur(8px);
      scale: 0.7;
    }
    50% {
      translate: 60% 50%;
      z-index: -4;
      filter: blur(0px);
      opacity: 1;
      scale: 1;
    }
    51% {
      z-index: 4;
    }
    75% {
      filter: blur(8px);
      opacity: 0.1;
      scale: 1.3;
    }
    100% {
      translate: -60% 50%;
      filter: blur(0px);
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
