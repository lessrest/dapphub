var rev = "5cad0d0fdb371721be4066ac7a9972aadc2754d1"
var dataUrl = "https://s3.eu-central-1.amazonaws.com/dapp-rev-results/" + rev + ".json"

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
            tag("ul", testCase.logs.map(log =>
              tag("li", [
                text(log.name || "<unknown event>")
              ].concat(
                log.params ? [
                  tag("ol", log.params.map(param =>
                    tag("li", [text(`${param.name}: ${param.value}`)])
                  ))
                ] : []
              ))
            ))
          ])
        ))
      ])
    )
  })
}
