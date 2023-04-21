function parseData(data) {
  const links = [];

  // Split the data into lines
  const lines = data.split('{%BR%}');

  // Loop through each line
  for (const line of lines) {
    // Extract the link, title, and time from the line
    const regex = /<a href=#(.+)>(.+)<\/a> (.+)/;
    const match = line.match(regex);
    if (match) {
      const link = match[1];
      const title = match[2];
      const time = match[3];

      // Add a new link object to the links array
      links.push({ link, title, time });
    }
  }

  // Return the links array in a JSON object with a "links" property
  return { links };
}

const data =
  '5. <a href=#naming_rules>Naming Rules.</a> 35.5-39.5.{%BR%}6. <a href=#importing_assets>Importing Assets.</a> 39.5-41.{%BR%}7. <a href=#post_processing>Post Processing.</a> 41-56.{%BR%}8. <a href=#character_controller>Character Controller.</a> 56-1:15.{%BR%}9. <a href=#character_visual_rotation>Character Visual, Rotation.</a> 1:15-1:23.{%BR%}10. <a href=#animations>Animations.</a> 1:23-1:43.{%BR%}11. <a href=#cinemachine>Cinemachine.</a> 1:43-1:49.{%BR%}12. <a href=#input_system_refactor>Input System Refactor.</a> 1:49-2:04.{%BR%}13. <a href=#collision_detection>Collision Detection.</a> 2:04-2:17.{%BR%}14. <a href=#clear_counter>Clear Counter.</a> 2:17-02:38.{%BR%}15. <a href=#interact_action>Interact Action, C# Events.</a> 02:38-02:48.{%BR%}16. <a href=#singleton>Selected Counter Visual, Singleton Pattern.</a> 02:48-03:11.{%BR%}17. <a href=#kitchen_object>Kitchen Object, Scriptable Objects.</a> 03:11-03:25.{%BR%}18. <a href=#player_pickup>Player Pick up, C# Interfaces.</a> 03:25-03:38.{%NAV2%}';

const jsonData = parseData(data);
console.log(JSON.stringify(jsonData, null, 2));
