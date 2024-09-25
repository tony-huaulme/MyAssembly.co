<script setup lang="ts">
import { link } from 'fs';
</script>

<template>
    <footer class="footer p-jc-between p-ai-start p-py-4" style="background-color: black !important;">
         <!-- Left Section -->
        
        <div class="footer-links flex-column">

          <div class="left-section">
          <p class="footer-description">
              Making the world a better place through constructing elegant hierarchies.
          </p>
          <div class="social-icons p-d-flex p-ai-center p-mt-2">
              <!-- linkdedIn Button, page : https://www.linkedin.com/company/myassembly-co -->
              <Button 
                as="a" 
                icon="pi pi-linkedin" 
                class="p-button-rounded p-button-text p-mr-2" 
                href="https://www.linkedin.com/company/myassembly-co" 
                target="_blank"
              />
              <!-- <Button icon="pi pi-facebook" class="p-button-rounded p-button-text p-mr-2" />
              <Button icon="pi pi-instagram" class="p-button-rounded p-button-text p-mr-2" /> -->

          </div>
        </div>
        <!-- Solutions Column -->
        <div class="footer-column">
            <h4 class="footer-title">Solutions</h4>
            <ul class="footer-list">
            <li><a href="#">3D Visualization</a></li>
            <li><a href="#">Assembly Instructions</a></li>
            <li><a href="#">Critical Point Alerts</a></li>
            <li><a href="#">Animations & Videos</a></li>
            </ul>
        </div>
    
        <!-- Platform Column -->
        <div class="footer-column">
            <h4 class="footer-title">Platform</h4>
            <ul class="footer-list">
            <li><a href="#">Project Scalability</a></li>
            <li><a href="#">Flexible Real-time Updates</a></li>
            <li><a href="#">Cloud-based Solutions</a></li>
            </ul>
        </div>
    
        <!-- Resources Column -->
        <div class="footer-column">
            <h4 class="footer-title">Resources</h4>
            <ul class="footer-list">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">FAQs</a></li>
            </ul>
        </div>
    
        <!-- Company Column -->
        <div class="footer-column">
            <h4 class="footer-title">Company</h4>
            <ul class="footer-list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            </ul>
        </div>
    
        <!-- Legal Column -->
        <div class="footer-column">
            <h4 class="footer-title">Legal</h4>
            <ul class="footer-list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            </ul>
        </div>
        </div>
    </footer>
</template>
  
<style scoped>
  .footer {
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
  }
  
  .left-section {
    max-width: 250px;
  }
  
  .footer-logo {
    width: 50px;
  }
  
  .footer-description {
    color: #666;
    margin-bottom: 1rem;
    font-size: 14px;
  }
  
  .social-icons button {
    font-size: 1.2rem;
    color: #666;
  }
  
  .footer-links {
    display: flex;
    gap: 2rem;
  }
  
  .footer-column {
    margin-right: 2rem;
  }
  
  .footer-title {
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .footer-list {
    list-style: none;
    padding: 0;
  }
  
  .footer-list li {
    margin-bottom: 0.5rem;
  }
  
  .footer-list li a {
    color: #666;
    text-decoration: none;
  }
  
  .footer-list li a:hover {
    text-decoration: underline;
  }
  </style>
  