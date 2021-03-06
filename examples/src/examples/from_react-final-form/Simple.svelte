<script context="module">
  import marked from 'marked'
  export const exampleMeta = {
    title: 'Simple example with no validation',
    description: marked(`
Uses the built-in DOM inputs: input, select, and textarea to build a form with no validation.
`),
    basedOnUrl: 'https://final-form.org/docs/react-final-form/examples/simple',
    basedOnSourceCodeUrl: 'https://github.com/final-form/react-final-form/tree/master/examples/simple',
  }
</script>

<script>
  import { Form, Field } from "svelte-final-form"
  import FormStateDebugInfo from '../../common/FormStateDebugInfo.svelte'

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  }
</script>

<article class="final-form-example">
  {@html marked(`
# ${exampleMeta.title}

${exampleMeta.description}

Compare to react-final-form:
[Example](${exampleMeta.basedOnUrl})
([Sandbox](${exampleMeta.basedOnSourceCodeUrl.replace('https://github.com', 'https://codesandbox.io/s/github/')}))

- Notice that you can use it with almost the exact same API, including passing \`component="input" type="checkbox"\` directly to a &lt;Field>.
- [Simple_FunctionalLabels](/Simple_FunctionalLabels): A slight variation of this that shows how to use use &lt;label for={field.input.name}> so that clicking on label actually focuses the input.
`)}
  <Form
    {onSubmit}
    initialValues={{ stooge: 'larry', employed: false }}
    let:form
    let:state
  >
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <form on:submit|preventDefault={form.submit}>
      <div>
        <label>First Name</label>
        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />
      </div>
      <div>
        <label>Last Name</label>
        <Field
          name="lastName"
          component="input"
          type="text"
          placeholder="Last Name"
        />
      </div>
      <div>
        <label>Employed</label>
        <Field name="employed" component="input" type="checkbox" />
      </div>
      <div>
        <label>Favorite Color</label>
        <Field name="favoriteColor" component="select">
          <option />
          <option value="#ff0000">❤️ Red</option>
          <option value="#00ff00">💚 Green</option>
          <option value="#0000ff">💙 Blue</option>
        </Field>
      </div>
      <div>
        <label>Toppings</label>
        <Field name="toppings" component="select" multiple>
          <option value="chicken">🐓 Chicken</option>
          <option value="ham">🐷 Ham</option>
          <option value="mushrooms">🍄 Mushrooms</option>
          <option value="cheese">🧀 Cheese</option>
          <option value="tuna">🐟 Tuna</option>
          <option value="pineapple">🍍 Pineapple</option>
        </Field>
      </div>
      <div>
        <label>Sauces</label>
        <div>
          <label>
            <Field
              name="sauces"
              component="input"
              type="checkbox"
              value="ketchup"
            />{' '}
            Ketchup
          </label>
          <label>
            <Field
              name="sauces"
              component="input"
              type="checkbox"
              value="mustard"
            />{' '}
            Mustard
          </label>
          <label>
            <Field
              name="sauces"
              component="input"
              type="checkbox"
              value="mayonnaise"
            />{' '}
            Mayonnaise
          </label>
          <label>
            <Field
              name="sauces"
              component="input"
              type="checkbox"
              value="guacamole"
            />{' '}
            Guacamole 🥑
          </label>
        </div>
      </div>

      <div>
        <label>Best Stooge</label>
        <div>
          <label>
            <Field
              name="stooge"
              component="input"
              type="radio"
              value="larry"
            />{' '}
            Larry
          </label>
          <label>
            <Field
              name="stooge"
              component="input"
              type="radio"
              value="moe"
            />{' '}
            Moe
          </label>
          <label>
            <Field
              name="stooge"
              component="input"
              type="radio"
              value="curly"
            />{' '}
            Curly
          </label>
        </div>
      </div>
      <div>
        <label>Notes</label>
        <Field name="notes" component="textarea" placeholder="Notes" />
      </div>

      <div>
        <button type="submit" disabled={state.submitting}>Submit</button>
        <button type="button" disabled={state.pristine} on:click={() => form.reset()}>Reset</button>
      </div>
    </form>

    <FormStateDebugInfo {state} />
  </Form>
</article>
