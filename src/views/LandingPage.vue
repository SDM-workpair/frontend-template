<template>
  <div id="landing-background">
    <br>
    <Navigation />
    <Hero />
    <Features />
    <Contact />
    <Footer />
  </div>
</template>

    <script>
    import Navigation from '@/components/LandingPage/Navigation.vue'
    import Hero from '@/components/LandingPage/Hero.vue'
    import Features from '@/components/LandingPage/Features.vue'
    import Contact from '@/components/LandingPage/Contact.vue'
    import Footer from '@/components/LandingPage/Footer.vue'

    export default {
    name: 'LandingPage',
    components: { Navigation,
        Hero,
        Features,
        Contact,
        Footer }
    }
    </script>

    <style>
      #landing-background {
        background-color: #040b12;
      }
    </style>
