function getData() {
    fetch('server/github.php')
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(json) {

            var privateRepos = 0;
            var publicRepos = 0;

            for(var i = 0; i < json["repositories"]['nodes'].length; i++) {
                if(json["repositories"]['nodes'][i]['isPrivate']) {
                    privateRepos++;
                } else {
                    publicRepos++;
                }
            }

            var repos = [];
            
            for(var i = 0; i < json["repositories"]['nodes'].length; i++) {
                if(json["repositories"]['nodes'][i]['description'] != null) {
                    if(json["repositories"]['nodes'][i]['description'].includes(DESCRIPTION_SELECTOR)) {
                        if(REMOVE_DESCRIPTION_SELECTOR) {
                            json["repositories"]['nodes'][i]['description'] = json["repositories"]['nodes'][i]['description'].replace(DESCRIPTION_SELECTOR, "");
                        }
                        repos.push(json["repositories"]['nodes'][i]);
                    }
                }
            }

            for(var i = 0; i < ((MAX_REPOS_VISIBLE != -1) ? MAX_REPOS_VISIBLE : repos.length); i++) {
                if(repos.length < i+1) {
                    continue;
                }

                var child = document.createElement('div');
                child.className = 'tableRow';
                child.innerHTML = '<span><strong>' + repos[i]['name'] + ": </strong>" + repos[i]['description'] + "</span>";

                document.getElementById("projectsVisible").appendChild(child)
            }

            var languages = [];
            for(var i = 0; i < json["repositories"]['nodes'].length; i++) {
                if(json["repositories"]['nodes'][i]['primaryLanguage'] != null) {
                    var lang = json["repositories"]['nodes'][i]['primaryLanguage'];

                    var found = false;
                    for(var l = 0; l < languages.length; l++) {
                        if(languages[l].name == lang.name) {
                            languages[l].uses++;
                            found = true;
                        }
                    }

                    if(!found) {
                        lang.uses = 1;
                        languages.push(lang);
                    }
                }
            }

            languages.sort(function(a, b) {
                return b.uses - a.uses;
            });

            var languageLabel = "";
            if(languages[0] != undefined) {
                languageLabel += languages[0].name + ", ";
            }
            if(languages[1] != undefined) {
                languageLabel += languages[1].name + ", ";
            }
            if(languages[2] != undefined) {
                languageLabel += languages[2].name;
            }

            document.getElementById("loading").style.display = 'none';
            document.getElementById("container").style.display = '';

            document.getElementById("profileIcon").src = json['avatarUrl'];
            document.getElementById("githubUsername").innerHTML = json['login'];
            document.getElementById("publicReposCount").innerHTML = publicRepos;
            document.getElementById("privateReposCount").innerHTML = privateRepos;
            document.getElementById("languagesCount").innerHTML = languages.length + "+";
            document.getElementById("languagesLabel").innerHTML = languageLabel;
            document.getElementById("seeMoreOnGitHub").href = 'https://github.com/' + json['login'];
    });
}

window.onload = function() {
    getData();
}