

function Accordion({question,solution}) {
  return (
    <div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">{question}</div>
        <div className="collapse-content text-sm">{solution}</div>
</div>
    </div>
  )
}

export default Accordion
