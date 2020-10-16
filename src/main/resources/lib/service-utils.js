exports.createResponseItem = function(name) {
  return {
    id: name,
    displayName: name
      .split("-")
      .map(capitalize)
      .join(" ")
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
