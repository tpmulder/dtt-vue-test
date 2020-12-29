<template>
  <div id="feedback" class="container page">
    <div class="container view">
      <h1 class="head-text spacing block">Feedback</h1>
      <div class="text-field justify block">
        <p class="response">
          Thank you so much for the feedback. I was aware of most of the flaws
          in my code because I did not focus on code quality. My primary focus
          was to build and design something that would look good and works as
          expected. After I received your feedback, I noticed that you really
          had looked into it and cared a lot about the quality of code. Because
          of this high-quality feedback, I refactored all the code in the
          application and made sure every point of feedback was properly
          processed and responded to.
        </p>
      </div>
      <section class="text-field justify block">
        <div class="sum-up">
          <p class="head-text">General feedback</p>
          <p>
            - In general, the design is nicely implemented. However, the code
            has some flaws.
          </p>
          <p class="response">
            Thank you! Since I opted for the application to look good rather
            than providing quality code, I was very happy about the feedback. I
            focused on not taking too long while I was still learning about Vue.
            Thinking about what I wanted to build and how the design would look
            like took me a lot of time. This time, I tried to keep the layout
            the same (there are some minor changes I opted for to make the
            design stand out more) while refactoring most of the code to make
            sure I would be able to explain every choice I made.
          </p>
          <p>
            - There is only a filter present on characters page. The required
            "sorting" feature is missing.
          </p>
          <p class="response">
            Sorry, my bad. I misunderstood the requirement. I changed the
            functionality and there is
            <router-link class="link" path="Characters" to="/characters"
              >sorting</router-link
            >
            available now.
          </p>
        </div>
        <div class="sum-up">
          <p class="head-text">UI</p>
          <p>- Nice UI implementation.</p>
          <p class="response">
            Thank you! I put a lot of effort in designing the application,
            because I wanted to show my creativity.
          </p>
          <p class="head-text">Format</p>
          <p>
            - There should be more comments added to explain important lines or
            relatively complex logic.
          </p>
          <p class="response">
            I agree on that. I should make this more of a habit. I have a hard
            time thinking about how I could use comments to make my code more
            readable, but I am not very good at choosing the right words. I
            tried my best adding more comments this time.
          </p>
          <p>- Could you explain how you choose media queries?</p>
          <p class="response">
            First, I build the UI and after that I experimented a bit with the
            best fit. The breakpoints I chose are for tablet and mobile.
          </p>
          <p>
            - Could you explain how you determine the level of nesting in SCSS
            code?
          </p>
          <p class="response">
            In most of the cases I used scoped component styling, so it might be
            a bit redundant to nest most of my scss. I like to do it this way,
            so I can always change the scope of the styling in the component
            without harming other styles (I add a component-specific id or class
            to the page or component and nest everything in there). I nest all
            of my scss in a simular fasion. Next to that, I always keep a
            globalStyles.scss file in my 'assets' directory for classes that I
            need to use more often.
          </p>
          <p>
            - Could you explain the reason you choose BEM style in some part of
            the CSS code?
          </p>
          <p class="response">
            I am aware of BEM styling being a bit tedious. I only use BEM
            styling for situations where it is very obvious how some tags are
            used within that element. This way I do not have to waste my time on
            adding classes to every tag. I also make sure that BEM styles are
            always deeply nested so it will not collide with other styles.
          </p>
          <p>
            - There are HTML elements missing required/recommended props, for
            instance, "alt".
          </p>
          <p class="response">
            Sorry, a bit sloppy. I made sure I added all attributes this time.
          </p>
          <p>- There are invalid HTML combinations.</p>
          <p class="response">
            I did not find the invalid combination, however I did refactor
            nearly all HTML code in the application, so I hope I fixed it
            without knowing.
          </p>
        </div>
        <div class="sum-up">
          <p class="head-text">Structure</p>
          <p>- It is not recommended to mix service and store. Choose one.</p>
          <p class="response">
            I do not think I created an obvious enough distinction between the
            two. I have made the distinction a bit clearer now. I have a typed
            client and a store. In my opinion, a store is there to format and
            store the fetched data and does not include any logic to prepare
            calls to an api. A store merely calls a client which fetches the
            data for it.
          </p>
          <p>
            - If in a Vue file, the entire template is almost just one
            component, it is not that necessary to extract it.
          </p>
          <p class="response">
            Yeah.. I overdid it. I changed it and I think the logic is much
            better divided now.
          </p>
        </div>
        <div class="sum-up">
          <p class="head-text">Logic</p>
          <p>
            - There are duplicated switch case used in multiple places. It can
            be moved to the defined service and reuse. In general, remove
            duplicated chunks of code.
          </p>
          <p class="response">
            This solution was terrible and not reusable at all. I improved my
            code this time and made it as DRY as possible.
          </p>
          <p>
            - There are redundant API calls, for instance, in CharacterList.vue
            the code in onMounted hook can be simplified, also the getById after
            getAll in Randomize.vue.
          </p>
          <p class="response">
            This time, I made sure zero redundant api calls were made. I used a
            bit of a hacky solution for this (see store code), but I really
            chose the wrong api to make this optimal.
          </p>
          <p>
            - There are also redundant function implementation, for instance,
            the event handler on line 29 and 35 in CharacterList.
          </p>
          <p class="response">
            I removed everything I no longer needed this time.
          </p>
          <p>
            - Minor comment for syntax: there is still some es5 syntax present,
            find out and change to es6.
          </p>
          <p class="response">
            I could not find it. I hope I replaced it on accident.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Feedback"
});
</script>

<style lang="scss" scoped>
.response {
  color: $text-light;
}
</style>
