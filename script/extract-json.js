const data =
  "1. Intro. 0-7.{%BR%}2. Instal Node.js. 7-13.{%BR%}3. <a href='#about'>About Node.js</a>. 13-21.{%BR%}4. <a href='#cli'>Node.js Cli</a>. 21-27.{%BR%}5. <a href='#core-modules'>Using Core Modules</a>. 27-33.{%BR%}6. <a href='#io-sync'>Read/Write Files</a>. 33-41.{%BR%}7. <a href='#blocking'>Blocking and non-blocking: Asynchronous nature of node.js</a>. 41-51.{%BR%}8. <a href='#io-async'>Read/Write Files Asynchronously</a>. 51-1:05.{%BR%}9. <a href='#web-server'>Creating a Simple Web Server</a>. 1:05-1:18.{%BR%}10. <a href='#routing'>Routing</a>. 1:18-1:33.{%BR%}11. <a href='#simple-api'>Building a (VERY) Simple API</a>. 1:33-1:48.{%BR%}12. Html templating: Buildding the templates. 1:48-2:02.{%BR%}13. <a href='#filling-templates'>Html templating: Filling the templates</a>. 2:02-2:22.{%BR%}14. <a href='#parsing-variables'>Parsing variables from urls</a>. 2:22-2:33.{%BR%}15. <a href='#own-modules'>Using Modules 2: Our Own Modules</a>. 2:33-2:40.{%BR%}16. <a href='#npm'>Introduction to npm and package.json file</a>. 2:40-2:45.{%BR%}17. <a href='#package-installs'>Types of packages and installs</a>. 2:45-2:58.{%BR%}18. <a href='#third-party'>Using modules 3: 3rd party modules</a>. 2:58-3:06.{%BR%}19. <a href='#versioning'>Package Versioning And Updating</a>. 3:06-3:18.{%BR%}20. <a href='#prettier'>Setting up Prettier in VSCode</a>. 3:18-3:30.{%BR%}21. Recap and what's next. 3:30-3:32.";

const links = [];
const sections = data.split('{%BR%}');
for (const section of sections) {
  const match = section.match(/<a href='#(.*?)'>(.*?)<\/a>\. (\d.+)$/);
  if (match) {
    const link = match[1];
    const title = match[2];
    const time = match[3];
    links.push({ link, title, time });
  }
}

const result = { links };
const jsonResult = JSON.stringify(result, null, 2);
console.log(jsonResult);
