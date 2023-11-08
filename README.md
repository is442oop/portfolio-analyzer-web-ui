<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://github.com/is442oop/portfolio-analyzer-backend/assets/101630007/44e4c2e0-4a38-44f4-8a6d-be65d51458b6" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">Portfolio Analyzer</h3>

  <p align="center">
    An advanced portfolio manager where users can visualize their holdings, manage a dedicated watchlist, and see their account balances.
    <br />
    <a href="https://github.com/is442oop"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://is442-oop.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/is442oop/portfolio-analyzer-web-ui/issues">Report Bug</a>
    ·
    <a href="https://github.com/is442oop/portfolio-analyzer-web-ui/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-application">Running the Application</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is a portfolio analyzer designed to help investment bankers and fund managers manage and analyze their investment portfolios. Whether you're a seasoned investor looking for advanced analytics or a novice investor wanting to track your investments, our project aims to provides the tools and insights you need to make informed financial decisions.

![image](https://github.com/is442oop/portfolio-analyzer-backend/assets/101630007/00f1d53d-2be6-4b25-9dbc-2866c80fc6be)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these steps to get the application up and running quickly.

### Prerequisites

* **Node.js**: JavaScript runtime used for running the application. You can download and install Node.js from the [official Node.js website](https://nodejs.org/en/download).
* **Supabase**: An open source Firebase alternative. You can create your own project from the [official Supabase website](https://supabase.com/)


### Installation


1. Clone the frontend repo
   ```sh
   git clone https://github.com/is442oop/portfolio-analyzer-web-ui.git
   ```
2. Install NPM packages
   ```sh
   cd portfolio-analyzer-web-ui
   npm install
   ```
3. Create a `.env` file in `portfolio-analyzer-web-ui` root folder with your API keys and Supabase URL.
    ```
    NEXT_PUBLIC_SUPABASE_ANON_KEY=ENTER-YOUR-KEY
    NEXT_PUBLIC_SUPABASE_URL=ENTER-DATABASE-URL
    API_URL=http://localhost:8080
    ALPHA_VANTAGE_API_KEY=ENTER-API-KEY
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Running the Application

Starting up the frontend server
```sh
npm install
npm run dev
```

<!-- USAGE EXAMPLES -->
## Usage

https://github.com/is442oop/portfolio-analyzer-backend/assets/101630007/a9b13251-f070-4c89-9a22-713a4515d21e

To better understand the backend services running, a [Swagger UI](http://localhost:8080/api/swagger-ui/index.html#/) has been created to visualise and test backend API endpoints. Start up the backend services to view the UI.

![image](https://github.com/is442oop/portfolio-analyzer-backend/assets/101630007/49bca898-293c-4ad5-a48f-8a17819189db)

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Springboot-url]: https://spring.io/projects/spring-boot
[Springboot-java]: https://img.shields.io/badge/Spring_Boot-white?style=for-the-badge&logo=springboot
[Java-url]: https://www.java.com/en/
[Java-pic]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[Maven-url]: https://maven.apache.org/
[Apache-Maven]: https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white
[Hibernate]: https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white
[Hibernate-url]: https://hibernate.org/
[Supabase]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[Supbase-url]: https://supabase.com/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Google-Cloud]: https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white
[Google-Cloud-URL]: https://cloud.google.com/free/?utm_source=google&utm_medium=cpc&utm_campaign=japac-SG-all-en-dr-BKWS-all-core-trial-EXA-dr-1605216&utm_content=text-ad-none-none-DEV_c-CRE_602258786551-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20GCP_General_core%20brand_main-KWID_43700071544383215-aud-1644542956228%3Akwd-26415313501&userloc_9062530-network_g&utm_term=KW_google%20cloud%20platform&gclid=Cj0KCQiAgK2qBhCHARIsAGACuzn7TZrLh0PyuAGwdTsxycRy90V_j6bfmv6Hf4RYkg3Aromq84FZpecaAl5lEALw_wcB&gclsrc=aw.ds