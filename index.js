var dataUrl = "https://s3.eu-central-1.amazonaws.com/dapp-rev-results/d4e01d8156241e02ca748c10dddd0da0245c3a63.json"

var req = new XMLHttpRequest()
req.onload = function() {
  show(JSON.parse(this.responseText))
}
req.open("GET", dataUrl)
req.send()

function tag(name, children) {
  var el = document.createElement(name.toUpperCase())
  children.forEach(x => el.appendChild(x))
  return el
}

function text(s) {
  return document.createTextNode(s)
}

function show(data) {
  Object.keys(data).forEach(testContractName => {
    results.appendChild(
      tag("li", [
        text(testContractName),
        tag("ul", data[testContractName].map(testCase =>
          tag("li", [
            text(`${testCase.ok ? "OK " : "FAIL "}${testCase.name}`),
          ].concat(testCase.logs.map(log =>
            tag("li", [
              text(log.name || "<unknown event>")
            ].concat(
              log.params ? [
                tag("ol", log.params.map(param =>
                  tag("li", [text(`${param.name}: ${param.value}`)])
                ))
              ] : []
            ))
          )))
        ))
      ])
    )
  })
}
