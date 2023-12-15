window.onload = () => {

  // Next button action
  const elements = document.getElementsByClassName("next-button");

  function continueEvent(event) {
    const target = event.target;
    const parent = findParentByCls(target, 'row', 5);
    const next = parent.nextElementSibling;

    parent.classList.remove('active');
    next.classList.add('active');
  };

  for (var i = 0; i < elements.length; i++)
    elements[i].addEventListener('click', continueEvent, false);

  // Prev button action
  const prevElements = document.getElementsByClassName("prev-button");

  function prevEvent(event) {
    const target = event.target;
    const parent = findParentByCls(target, 'row', 5);
    const prev = parent.previousElementSibling;

    parent.classList.remove('active');
    prev.classList.add('active');
  };

  for (var i = 0; i < prevElements.length; i++)
    prevElements[i].addEventListener('click', prevEvent, false);

  // Helpers
  function findParentByCls(node, cls, maxTries = 0) {
    let tries = 0;

    while (!node.classList || !node.classList.contains(cls)) {
      node = node.parentElement;

      if (!node || (maxTries > 0 && tries === maxTries)) {
        return null;
      }

      tries++;
    }

    return node;
  }
};