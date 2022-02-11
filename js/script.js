{
'use strict';

    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
            // console.log(activeLink.classList);
        }
        /* [DONE] add class 'active' to the clicked link */

        // console.log('clickedElement:', clickedElement);
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
            // console.log(activeArticle.classList);
        }
        /* [DONE] get 'href' attribute from the clicked link */

        const hrefAttribute = clickedElement.getAttribute('href');
        // console.log(hrefAttribute);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const selectedArticle = document.querySelector(hrefAttribute);
        // console.log(selectedArticle);

        /* [DONE] add class 'active' to the correct article */

        selectedArticle.classList.add('active');
    }

    const generateTitleLinks = function(){
        console.log('generateTitleLinks activated');
        
        /* for each article: */

        const allArticles = document.querySelectorAll('.posts article');
        const titlesListSelector = document.querySelector('ul.titles');
        let titleLinkHTML = '';
        let titleLinksListHTML = '';

        for (let article of allArticles){

            /* find id */

            const articleId = article.getAttribute('id');
            // console.log(articleId);

            /* find title */

            const articleTitle = article.querySelector('h3').innerText;
            // console.log(articleTitle);

            /* create HTML for li */
                
            titleLinkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
            // console.log(titleLinkHTML);

            /* insert created HTML link into HTML variable */

            titleLinksListHTML = titleLinksListHTML + titleLinkHTML;
            
        }

        // console.log(titleLinksListHTML);

        titlesListSelector.innerHTML = titleLinksListHTML;
    }

    generateTitleLinks();

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}