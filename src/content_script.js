const emojiRegex = require('emoji-regex');

walk(document.body);

setInterval(() => walk(document.body), 15000);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	if ((node.tagName && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'))
	    || (node.classList && node.classList.contains('ace_editor'))) {
		return;
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}


function handleText(textNode) 
{
	var v = textNode.nodeValue;

	const rude = ['🍆', '🖕', '👉👌', '💩'];

	var regex = emojiRegex();
	var item = rude[Math.floor(Math.random()*rude.length)];

	v = v.replace(regex, item);
	
	textNode.nodeValue = v;
}


