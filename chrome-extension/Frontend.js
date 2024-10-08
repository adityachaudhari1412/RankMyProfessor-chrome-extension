
// Creates an active light to show the extension is running.
var notify = document.createElement('div');
notify.setAttribute('id', 'Active');

var node = document.createTextNode('Rank my professor extension is in use');
notify.appendChild(node);

var greenDot = document.createElement('div');
greenDot.setAttribute('id', 'On');
notify.appendChild(greenDot);
document.body.appendChild(notify);

setTimeout( () => 
{
	// Instantiating Variables
		//Find Table w/ Teachers + Classes + Subject
	var table1 = document.querySelector('[title="Class Options"]');
	var scoreString;
	var profNames = new Array();
	var SplitNames = new Array();
	var profScores = new Array();
	var txtValue = "";
	var iterator = 0;
	var total = 0;
	//boolean  assign false
	document.createElement("button");
	// Creates Verbose Content

	//Btn.appendChild(newContent);
	//td.append(MyBtn);

	if (table1 != null)
	{

		//Find the rows of the table.
		tr = table1.getElementsByTagName("tr");

		//Find what subject/class it is, EX: CSE 3311
		classNum = document.getElementById("SSR_CRSE_INFO_V_SSS_SUBJ_CATLG");

		// Loops for each class session that is offered.
		for (let i = 0; i < tr.length; i++)
		{
			td = tr[i].getElementsByTagName("td")[6];
			if (td)
			{
				//Makes sure no middle name is included in txtValue
				txtValue = td.textContent;
				SplitNames = txtValue.split(" ");
				if(SplitNames.length == 3 )
				{
					txtValue = SplitNames[0] + " " + SplitNames[2];
				}
				txtValue = txtValue.trimLeft().trimRight();
				profNames.push((txtValue));
				//findLocation(td);

				// Connects to database
				chrome.runtime.sendMessage({command: "fetch", data: txtValue },
				(response) =>
				{
					profScores.push(response.Ovr_Score)
					profScores.push(response.Clarity)
					profScores.push(response.Communication)
					profScores.push(response.Encouragement)
					profScores.push(response.Availability)
					profScores.push(response.Preparedness)
				} );
			}
		}
		setTimeout(() => 
		{
			for (let i = 0; i < tr.length; i++)
			{
				td = tr[i].getElementsByTagName("td")[6];
				if (td)
				{
					//Create new Div && Fill it with Scores + " Topic "
					for (iterator = 0; iterator < 6; iterator++)
					{
							var score = profScores[iterator+total];
							if( typeof(profScores[iterator+total]) != "undefined" )
							{
								score = score.toFixed(2);
								scoreString = score.toString();
								if( iterator == 0 && typeof(profScores[iterator+total]) != "undefined" )
								{
									scoreString	 += " Ovr_Score "
								}
								else if ( iterator == 1 && typeof(profScores[iterator+total]) != "undefined"  )
								{
									scoreString	 += " Clarity "
								}
								else if ( iterator == 2 && typeof(profScores[iterator+total]) != "undefined" )
								{
									scoreString	 += " Communication "
								}
								else if ( iterator == 3 && typeof(profScores[iterator+total]) != "undefined" )
								{
									scoreString	 += " Encouragement "

								}
								else if ( iterator == 4 && typeof(profScores[iterator+total]) != "undefined" )
								{
									scoreString	 += " Availability "

								}
								else if ( iterator == 5 && typeof(profScores[iterator+total]) != "undefined" )
								{
									scoreString	 += " Preparedness "

								}
								//Creates New Div

								console.log(score);
								newContent = document.createTextNode(scoreString);
								newDiv = document.createElement("div");
								newDiv.setAttribute("id", "Display");
								newDiv.appendChild(newContent);
								td.append(newDiv);
								//newDiv.addEventListener('click', Clicked());
							}
					}

				total += 6;

				}
			}	
		}, 1000);

	}
}, 2000);
