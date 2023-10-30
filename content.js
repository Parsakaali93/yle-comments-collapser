        
		const buttonHTML = '<button style="background-color:#f1f2f4; color:black; padding:6px; border-radius:15px; margin-bottom:5px; border:none;" class="collapse-button">Piilota vastaukset</button>';
		let inserted = false;
		let observer;
		let addedButtons = 0;
		let newEls = 0;
		
		// Function to check if the button is available and change its text
		function insertCollapseButtons() {
			var comments = document.querySelectorAll('#app [id^="comm"]:not([id^="comment-textarea"])');
			addedButtons++;
			
			if (comments.length > 0 && !inserted) {
				comments.forEach((comment) => {
					
					addedButtons++;
					
					comment.insertAdjacentHTML('beforebegin', buttonHTML);
					comment.id = "buttonAdded" + comment.id;
					const CollapseButton = comment.previousElementSibling;
					
					CollapseButton.onmouseover = function() {
									this.style.backgroundColor = '#e8e8e8';
								};

					CollapseButton.onmouseout = function() {
						this.style.backgroundColor = '#f1f2f4';
					};					
					
					CollapseButton.addEventListener('click', () => {
						const ulElement = CollapseButton.parentElement.querySelector('ul');
						if(ulElement.style.display !== 'none')
						{
							ulElement.style.display = 'none';
							CollapseButton.textContent  = 'Näytä vastaukset';

						}
						
						else
						{
							ulElement.style.display = '';
							CollapseButton.textContent  = 'Piilota vastaukset';

						}
						
						//console.log("kissa");
					});
				});
			}
		}

		function elementAppearedCallback(mutationsList, observer) {
		  for (let mutation of mutationsList) {
			if (mutation.type === 'childList') {
			  const addedNodes = mutation.addedNodes;
					  
				for (let i = 0; i < addedNodes.length; i++) {
				const addedElement = addedNodes[i];
				// console.log(addedElement.id);
				
			  }
			  
			  // Check if the 'comments-plugin' element has been added
			  const commentsPluginElement = document.getElementById('yle-comments-plugin');
			  if (commentsPluginElement) {
					insertCollapseButtons();
			  }
			}
		  }
		}
		
		observer = new MutationObserver(elementAppearedCallback);
		
        // Start observing changes in the container element
        observer.observe(document.getElementById("app"), { childList: true, subtree: true });
        
        // Initially check for the button in case it's already there
        insertCollapseButtons();