const blockedDomains = [
  "google",
  "yahoo",
  "duckduckgo",
  "yandex",
  // ... (ajoutez d'autres morceaux de noms de domaines à bloquer)
];

function shouldBlockOnDomain(currentDomain) {
  for (const blockedDomain of blockedDomains) {
    if (currentDomain.includes(blockedDomain)) {
      return true;
    }
  }
  return false;
}

function applyStylesToTextNodes(rootNode) {
  if (shouldBlockOnDomain(window.location.hostname)) {
    return; // Bloquer la mise en gras automatique sur ce site
  }

  const textNodes = [];

  function collectTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
      textNodes.push(node);
    } else {
      for (const childNode of node.childNodes) {
        collectTextNodes(childNode);
      }
    }
  }

  collectTextNodes(rootNode);

  for (const textNode of textNodes) {
    const newText = textNode.textContent
      .split(/\b/)
      .map(part => {
        if (part.match(/[a-zA-Z]/)) {
          if (part.length === 2) {
            return `<span class="bold">${part[0]}</span>${part[1]}`;
          }
          else if (part.length === 3) {
          return `<span class="bold">${part[0]}</span>${part[1]}</span><span class="bold">${part[2]}</span>`;
        } else if (part.length === 4) {
          return `<span class="bold">${part[0]}</span>${part.substring(1, 3)}<span class="bold">${part[3]}</span>`;
        } else if (part.length > 4) {
          const middleIndex = Math.floor(part.length / 3);
          const firstPart = part.substring(0, middleIndex);
          const lastPart = part.substring(middleIndex, part.length - 1);
          const lastLetter = part[part.length - 1];

          return `<span class="bold">${firstPart}</span>${lastPart}<span class="bold">${lastLetter}</span>`;
        }
        }
        return part;
      })
      .join('');

    const newElement = document.createElement('span');
    newElement.innerHTML = newText;
    textNode.parentNode.replaceChild(newElement, textNode);
  }
}

applyStylesToTextNodes(document.body);


