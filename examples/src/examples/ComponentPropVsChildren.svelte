<script context="module">
  import marked from 'marked'
  export const exampleMeta = {
    title: marked(`\`<Field component=…>\` vs. passing children to \`<Field>\``),
    description: marked(`
`),
  }
</script>

<script>
  import { Form, Field } from "svelte-final-form"
  import FormStateDebugInfo from '../common/FormStateDebugInfo.svelte'

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
`)}
  <Form
    {onSubmit}
    initialValues={{ stooge: 'larry', employed: false }}
    let:form
    let:state
  >
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <form on:submit|preventDefault={form.submit}>
      <div>(Minimal possible example:)</div>
      <div>
        <label>First Name</label>
        <Field name="firstName" />
      </div>

      <div>(Passing component prop:)</div>
      <div>
        <label>First Name</label>
        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />
      </div>

      <div>(Passing children directly:</div>
      <div>
        <Field
          name="firstName"
          type="text"
          let:field={{input, handlers}}
        >
          <label for={input.id}>First Name</label>
          <input
            {...input}
            on:blur={handlers.onBlur}
            on:focus={handlers.onFocus}
            on:input={handlers.onChange}
            placeholder="First Name"
          />
        </Field>
      </div>

      <div>
        <button type="submit" disabled={state.submitting}>Submit</button>
        <button type="button" disabled={state.pristine} on:click={() => form.reset()}>Reset</button>
      </div>
    </form>

    <FormStateDebugInfo {state} />
  </Form>
</article>
