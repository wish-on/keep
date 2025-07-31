/**
* Template Name: Medilab
* Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = [ "gasdaniel", "2-Phenoxyethanol ( 2-Phenoxyethanol 99% For Synthesis )",
"4-Acetamidophenol (4-Acetamidophenol 98% Extra Pure )",
"4-Chloro-m-cresol (4-Chloro-m-cresol 98% Extrapure )",
"4-Chloro-m-Xylenol(PCMX)",
"Acaccia Powder (Acacia Extrapure )",
"Accucheck Strips",
"Acetic Acid (Acetic Acid Glacial 99.5% Extrapure )",
"Acetiic acid",
"Acetone",
"Acetone 500mls ( Acetone 99% Extrapure )",
"Acetonitrile2.5L",
"Air Conditioners(AC)",
"Aluminium Coat",
"Amaranth Extra Pure (Amaranth Extra Pure )",
"Ammeter 0-1A",
"Ammeter 0-3A",
"Ammeter 0-5A",
"Ammeter Dual Range",
"Ammonium Acetate",
"Ammonium Bicarbonate 98.5% (Ammonium Bicarbonate 98.5% Extrapure )",
"Ammonium carbonate",
"Ammonium Chloride ( Ammonium Chloride 99% Extrapure )",
"Ammonium Ferric Citrate (Ammonium Ferric Citrate (Brown) Extra Pure )",
"Ammonium Ferric Sulphate ( Ammonium Ferric Sulphate Dodecahydrate 98% Extrapure )",
"Ammonium Ferrous Sulphate (AMMONIUM FERROUS SULPHATE)",
"Ammonium Hydroxide",
"Ammonium Nitrate",
"Ammonium Oxalate Monohydrate (Ammonium Oxalate Monohydrate 99% Extrapure )",
"Ammonium Solution imported",
"Ammonium Solution Local 2.5l",
"Ammonium Sulphate",
"Ammonium Sulphide",
"Ammoxycillin caps 250gx100",
"Angle Valve",
"AniseedOil ExtraPure( anise Oil (Aniseed Oil ExtraPure ( anise Oil) )",
"Arachis Oil Extrapure ( Arachis Oil Extrapure )",
"Asot Reagent",
"Ball Valves 1/2 to 5/16",
"Bar Magnet",
"Barium Chloride",
"Barium Nitrate ( Barium Nitrate 98.5% Extrapure )",
"Barium Sulphate",
"Basic Fuchsin 85% DyeMicroscopy (Basic Fuchsin 85% Dye Content For Microscopy (M....",
"Beaker Glass",
"Beaker Glass 1000Mls",
"Beaker Glass 2000MLS",
"Beaker Glass 250mls",
"Beaker Glass 25mls",
"Beaker Glass 500mls",
"Beaker Glass 50mls",
"Beaker Glass100mls",
"Beaker Plastic 20mls",
"Beaker Plastic 250mls",
"Beaker Plastic 500mls",
"Beaker Plastic100mls",
"Beaker Pyrex 250mls",
"Beaker Pyrex100mls",
"Beaker Pyrex500mls",
"Beaker Pyrex50mls",
"Bed sheet (white)",
"Bee Hive Shelves 3'",
"Bees Wax Pure (White) (Bees Wax Pure (White) )",
"Benedict Solution1litre",
"Bentonite Powder Extra Pure (Bentonite Powder Extra Pure )",
"Benzaldehyde 98.5% Extrapure (Benzaldehyde 98.5% Extrapure )",
"Benzalkonium Chloride 50% w/v (Benzalkonium Chloride 50% w/v Aqueous Solution Ext...",
"Benzoic Acid 99.5% (Benzoic Acid 99.5% Extrapure )",
"Benzyl Benzoate 99% Extrapure ( Benzyl Benzoate 99% Extrapure )",
"Bib tap pex 1/2'",
"Blue Pippete Tips",
"Bobath ball",
"Boiling tube brush",
"Boiling Tube Glass",
"Boiling Tube Pyrex",
"Borax (decahydrate) 99% (Borax (decahydrate) 99% Extrapure )",
"Boric Acid (Powder) 99.5% (Boric Acid (Powder) 99.5% Extrapure )",
"Bosch Hot Air Gun",
"Boss Head 1",
"Bp Machine",
"Brilliant Green Indicator 95% (Brilliant Green Indicator 95% Dye Content )",
"Bunsen Burner",
"Burrete 10mls",
"Burrete Acrylic",
"Burrete Brush",
"Burrete Rotaflow",
"Burrete With Clip",
"Butanedioic Acid/Succinic acid",
"Calamine 98% (Calamine 98% Extrapure )",
"Calamine Powder 500G local",
"Calcium Carbonate",
"Calcium chloride",
"Calcium gluconate inj",
"Calcium Hydroxide 95% (Calcium Hydroxide 95% Extrapure )",
"Calcium Nitrate (Calcium Nitrate Tetrahydrate 98% Extrapure )",
"Calcium Sulphate ( Calcium Sulphate Dihydrate 98% Extrapure )",
"Calculator Simple",
"Calicium Chrolide",
"Camphor 95% Extrapure (Camphor 95% Extrapure )",
"Carbopol 940 (Carbopol 940 (Carboxy vinyl polymer 940)  )",
"Carboxy MethylCelluloseSodium (Carboxy Methyl Cellulose Sodium Salt (High viscosi...",
"Castor Oil Extrapure (Refined) (Castor Oil Extrapure (Refined) )",
"Ceiling Fan Panasonic",
"Cell Holder Double",
"Cell Holder Single",
"Centrifuge 4holes",
"Centrifuge Tube 50MLS",
"Centrifuge Tube15MLS P/50",
"Cetostearyl Alcohol Extrapure (Cetostearyl Alcohol Extrapure )",
"Cetriaxione 1gm",
"Cetrimide 96% Extrapure ( Cetrimide 96% Extrapure )",
"CHEMICALS",
"Chloroform 2.5litre",
"Chloroform 500mls (Chloroform 99% For Synthesis )",
"Chroloform Loba",
"Chromium Chrolide",
"Chromotographic Column",
"Cinnamon Oil Extrapure (Cinnamon Oil Extrapure )",
"Citric Acid Anhydrous 99.5% ( Citric Acid Anhydrous 99.5% Extrapure )",
"Coal Tar",
"Cobalt(II) Chrolide Test Paper",
"Codliver Oil Liquid ( Codliver Oil Liquid )",
"Combined therapeutic ultrasound (Machine)",
"Concave Mirror",
"Conduit pipe 1/2",
"Conical Flask 250ml",
"Connecting Wire",
"Control Valve",
"Converging lens",
"Copper (II) Nitrate Tri 95% (Copper (II) Nitrate Trihydrate 95% Extrapure )",
"Copper (II) Sulphate Anhy 98% ( Copper (II) Sulphate Anhydrous 98% Extrapure )",
"Copper (II) Sulphate pentahydra",
"Copper Calorimeter",
"Copper Chloride",
"Copper fillings",
"copper metal",
"Copper Pipe",
"Copper Wire",
"Copper(11)Carbonate(basic)Extra (Copper(11)Carbonate(basic)Extra)",
"Cork Bored",
"Cork Rubber",
"Corner chair",
"Costantine Wire 26SWG",
"Costantine Wire 28SWG",
"Costantine Wire 30SWG",
"Cotton Gloves",
"Cotton Thread",
"Cotton wool",
"Crip sedo 5/16",
"Crocodile Clip",
"Crucible With Lid",
"Crystal Violet 88% (Crystal Violet 88% Dye Content For Microscopy )",
"Crystal Violet Powder 25g",
"Culture Bottle 250MLS",
"Delivery Tube",
"Delivery Tubee Per kg",
"Density Bottle 50mls",
"Density bottles 25mls",
"Detergent Jik",
"Detergent Soap",
"Dextrose /Glucose",
"Dextrose Agar",
"Diazepam Injection",
"DicloroMethane 2.5",
"Diethyl Ether 98% For Synthesis (Diethyl Ether 98% For Synthesis Diethyl Ether 9...",
"Digital Scale",
"Digital Thermometer",
"Disposable Syringe with needles",
"Dissecting Forceps",
"Dissecting Kit Large Size",
"Dissecting Tray 1",
"Distilled Water",
"Double Beam Balance",
"Dropper Dispsable",
"Dropper With Teat",
"Dropping Bottle 125mls clear",
"Dry Cell AAA",
"Dry Cell ABCV",
"Dry Cell DD",
"Dumb bells (1/2kg,1kg,2kg,3kg,5kg)",
"Edta vacutainer tubes 1*100",
"Egg Albumine",
"Egg Albumine 200g",
"Egg Albumine 25gm",
"Egg Albumine 500g",
"Elbow 1 1/2'",
"Electronic Balance",
"Emulsifying Wax local",
"EmulSifying Wax Extra Pure (EmulSifying Wax Extra Pure )",
"Eosin y Powder",
"Ethanol",
"Ethanol Local 2.5ltr",
"Ethanol Local 5ltr",
"Ethyl Acetate",
"Ethylen Tetra Acetic Acid 99% (Ethylenediamine Tetra Acetic Acid Disodium Salt Di...",
"Eucalyptus Oil ( Eucalyptus Oil )",
"Eureca Can",
"Evaporating Dish Glass",
"Examination Gloves",
"Face Shield",
"Ferric Chloride Anhydrous",
"Ferric Nitrate",
"Ferric Sulphate Monohydrate (Ferric Sulphate Monohydrate Extrapure )",
"Ferrous Chloride",
"Ferrous Chrolide",
"Ferrous Nitrate",
"Ferrous Sulphate",
"Ferrous Sulphide",
"Fillament Lamp",
"Filter Funel",
"Filter Funnel",
"Filter Paper Watman 12.5cm",
"Filter Paper Watman 15cm",
"Flat Bottomed flask",
"Flat Bottomed Flask 250mls",
"Forcept",
"Formalin 0.5ltr",
"Formaline Solution 37-41% (Formaline Solution 37-41% w/v Extrapure )",
"French Chalk Powder Extrapure (French Chalk Powder Extrapure )",
"G Clamp",
"Galvanometer Zero Centered",
"Gas Cylinder 15KG",
"Gas Elbow joint 5/16",
"Gas Jar",
"Gas Jar cover",
"Gas socket 5/16",
"Gas Tank 30kg",
"Gas Tap double",
"Gas Tap Single",
"Gas Tap two Way",
"Gas tap Two way 5/16",
"GasTee joint 5/16",
"Gate valve 1/2",
"Gauze Large",
"Gauze.",
"Gelatin Powder For Bacteriology (Gelatin Powder For Bacteriology )",
"Gels",
"Gentian violet 25g",
"Giemsa Stain sock solution 500m",
"Glass Block 75x50x12mm",
"Glass Block 75x50x15mm",
"Glass Block Large",
"Glass Prism 38x38mm",
"Glass Prism 50x50mm",
"Glass Reagent Spray Bottle",
"Gloves Acid Proof",
"Glucose Ar",
"Glucose Plus",
"Glycerol 98% Extrapure ( Glycerol 98% Extrapure )",
"Golori Burrete",
"Gram Iodimne 2,5ltr",
"Gum Tragacanth (Gum Tragacanth )",
"Half Metre Ruler",
"Hand Lens",
"Harris Hematoxyline Powder 50g",
"HCG Test Strips",
"HEP b surface AG",
"Herical Spring",
"Histology blunt forceps",
"Histology hot plate",
"Histology slide mounting medal",
"Histology straining buckets/dis",
"Histology water bath(mh3517)",
"Horse clamp",
"Hose Pipe",
"Hose pipe 10mm",
"Hose Pipe 50m",
"Hospital Beds",
"Hot Plate",
"Hydrochloric Acid 35% Extrapure (Hydrochloric Acid 35% Extrapure )",
"Hydrocoleter",
"Hydrocortisone Acetate 97% ( Hydrocortisone Acetate 97% Extrapure )",
"Hydrogen Peroxide",
"Hydrogen Sulphide",
"Hydrometee",
"Illuminate Object",
"Indicator Papers-(pH 1.0-14.0) ( Indicator Papers - Full Range (pH 1.0 - 14.0)",
"Iodine (Resublimed) 98.5% (Iodine (Resublimed) 98.5% Extrapure )",
"Iodine Solution 1ltr",
"Ips 3/4'x1/2'",
"Ips Bush 3/4 to 1/2",
"Ips Elbow 1/2",
"Ips Elbow 3/4",
"Ips Nipple 1/2",
"Ips Pipe 1/2",
"Ips Socket 1/2",
"Ips Tee 1 1/2'",
"Ips Union 1/2",
"Ips union 3/4'",
"IpsTee 1/2",
"Iso Butanol",
"Jockey Pencil",
"Kaolin Extrapure (Heavy) (Kaolin Extrapure (Heavy) )",
"Katamine Injection",
"Kitchen Sink",
"Kn95 Mask",
"Knee strengthen machine",
"Knife Edge",
"Kovacs Reagent",
"L-Ascorbic Acid 99% Extrapure ( L-Ascorbic Acid 99% Extrapure )",
"Lable Large",
"Lable Small",
"Laboratory Coat",
"Laboratory Sink",
"Lactose Monohydrate Extrapure",
"Lanolin Anhydrous Extra Pure ( Lanolin Anhydrous Extra Pure )",
"Lead Acetate",
"Lead Carbonate 98% Extrapure",
"Lead Chloride",
"Lead Nitrate 99% Extrapure ( Lead Nitrate 99% Extrapure )",
"Lemon Oil Extrapure ( Lemon Oil Extrapure )",
"Lignocaine inj 30ml",
"Lignocaine inj 50mls",
"Lime Waterr",
"Linsed Oil Extrapure",
"Liquid Parafin",
"Litmus Paper Blue",
"Litmus Paper Red",
"Magic pipe 1 1/2",
"Magnesium Carbonate Basic 40% ( Magnesium Carbonate Basic Light 40% Extrapure )",
"Magnesium Chloride Hexa 98% ( Magnesium Chloride Hexahydrate 98% Extrapure )",
"Magnesium Hydroxide 95% Extrapu",
"Magnesium Metal Turning",
"Magnesium Oxide",
"Magnesium Ribbon",
"Magnesium Sulphate Hepta 99% ( Magnesium Sulphate Heptahydrate 99% Extrapure )",
"Magnesium sulphate inj 50%10",
"Magnesium Trisilicate Hydrate P",
"Magnetic Stirrer",
"Magnetic Compas",
"Magnetic stirer with magnets on",
"Malachite Green 25g",
"Male connector 3/4'",
"Manganise IV Oxide",
"Masking Tape",
"Measuring Cylinder 1000mls",
"Measuring Cylinder 100mls",
"Measuring Cylinder 10mls",
"Measuring Cylinder 20mls",
"Measuring Cylinder 25mls",
"Measuring Cylinder 500mls",
"Measuring Cylinder 50ml Plastic",
"Measuring Cylinder 50mls",
"Measuring Cylinder Plastic 25ml",
"Measuring Cylinder Plastic100ml",
"Media Culture Bottle Amber 1000",
"Media Culture Bottle Amber 100m",
"Media Culture Bottle Amber 2000",
"Media Culture Bottle Amber 500m",
"MEDICAL EQUIPMENTS",
"Mentha Pepprita Oil Extrapure ( Mentha Pepprita Oil Extrapure (Perpermint oil) )",
"Mercuric chloride 500g",
"Mercuric oxide 50g",
"Mercury thermometer",
"Metalic Rods",
"Metallic Rods",
"Methanol",
"Methanol 99.5% Extrapure",
"Methyl-p-hydroxybenzoate 99% Ex",
"Methyl Cellulose(highviscosity ( Methyl Cellulose (high viscosity) )",
"Methyl Orange 500mls",
"Methyl Orange Powder",
"Methyl Salicylate 99% For Synth",
"Methylated Spirit",
"Methylene Blue Powder 25g",
"Metre Bridge",
"Metre Ruller Mdf",
"Metre Ruller Wooden",
"Micro Pippete Blue P/500",
"Micro Pippete Yellow P/1000",
"Micrometer Screw Gauge",
"Micrometer Sg Digital",
"Microscope Slides Frosted",
"Model Ear",
"Model Extration",
"Model Eye",
"Model Heart",
"Model Kidney",
"Model of human skeleton",
"Model Reproductive Female",
"Model Reproductive Male",
"Model Respiratory",
"Model Skin",
"Mortal&Pestle 3''",
"Mortar And Pestle 4''",
"Mounting Needles",
"MRDT",
"Multifunctional Office Paper",
"Multistyick",
"N Hexane 2.5",
"Neutral Red Powder 25g",
"NGT 10",
"NGT G18",
"Nichrome Wire 24swg",
"Nichrome Wire 26SWG",
"Nichrome Wire 28SWG",
"Nichrome Wire 30SWG",
"Nipple G.S 3/4",
"Nitric Acid 69% Extrapure",
"Non-Trap 1 1/2",
"o-Cresol 98% For Synthesis ( o-Cresol 98% For Synthesis )",
"Oil Immersion type A 10-15ml",
"Oleic Acid Extrapure",
"Optical Pin 1",
"Oxalic Acid",
"P-Trap 4",
"Pair of Cork Pads",
"Pair Of Scissors",
"Paracetamol blister 10x10s",
"Paraffin Liquid Colouries,Heav ( Paraffin Liquid Colouries, Heavy )",
"Paraffin Wax Pellets 58-60°C",
"Paraller bar",
"Patella Hammer Tiangulla",
"Pathology mounting slide p/50",
"Pauster Pippete Glass",
"Pauster Pippete Plastic P/250",
"PC Klean pH (2-5% Solution) ( PC Klean (Neutral) Cleaning Solution pH (2-5% Solut...",
"Pen Torch (PEN TORCH)",
"Pendulum Bob",
"Perchloroethylene 99% Extrapur ( Perchloroethylene 99% Extrapure  )",
"Petri Dish Glass",
"Petri Dish plastic",
"Petroleum Ether 2.5",
"Ph Meter",
"Phenobarbitone Injection",
"Phenol 90% w/w Solution in Wate (Phenol 90% w/w Solution in Wate)",
"Phenol Crystals 99% Extrapure (Phenol Crystals 99% Extrapure)",
"Phenolphthalein Indicator 0.5L",
"Phenolphthalein Powder",
"Phenyl Mercuric Nitrate 99% For (Phenyl Mercuric Nitrate 99% For Synthesis)",
"Pippete Filler 3 Ways",
"Pippete 10mls",
"Pippete 20mls",
"Pippete 25mls",
"Pippete 5mls",
"Plain Mirror",
"Plain Mirror with stand",
"Plain vacutainer tubes 1*100",
"Plastic And Ground Glass Stoppe",
"Plastic test tube 5-7ml",
"Plasticinee",
"Plug Key Single",
"Poly male 3/4",
"Poly pipe 3/4",
"Poly Tee 3/4 Class B",
"Polycarbonate Mice Food Cage",
"Polycarbonate Rat Food Cage",
"Polyvinyl Pyrrolldone K30 For S (Polyvinyl Pyrrolldone K30 For Synthesis)",
"Potassium Carbonate",
"Potassium Chlorate",
"Potassium Chromate",
"Potassium Dichromate",
"Potassium Ferocynide",
"Potassium Ferricyanide",
"Potassium Hydroxide Pellets 85% (Potassium Hydroxide Pellets 85%)",
"Potassium Iodide 100gm (Potassium Iodide 99% Extrapure)",
"Potassium Iodide 500gms",
"Potassium Permanganate",
"Potentiometer",
"Pp Sink",
"Proflavin Hemisulphate Dihydrat (Proflavin Hemisulphate Dihydrat)",
"Propyl-P-Hydroxy Benzoate99.5% ( Propyl-P-Hydroxy Benzoate 99.5% Extrapure )",
"Propylene Glycol 99% Extrapure (Propylene Glycol 99% Extrapure)",
"Pulley Single Wheel",
"Pvc elbow 1 1/2",
"Pvc Elbow 1 1/4Class B",
"Pvc pipe 1 1/2'",
"Pvc Pipe 1 1/4",
"Pvc Pipe 1 1/4 Class B",
"Pvc Plug 1 1/4 Class B",
"Pvc Tee 1 1/4 Class B",
"Quickfi Adapter Stopcock Shape",
"Quickfit Adapter Expansion Cone",
"Quickfit Adapter Receiver,Vacuu",
"Quickfit Adapter Splash",
"Quickfit Adapter Stopcock shape",
"Quickfit Adapters Reduction Con",
"Reagent Bottle 125Ml(Amber)",
"Reagent Bottle 250ml(Amber)",
"Reagent Bottle 30ml(Amber)",
"Reagent Bottle 500ml(Amber)",
"Reagent Bottle 60ml(Amber)",
"Reagent Bottle Brown",
"Reagent Bottle Clear",
"Reagent Bottle Clear 1000mls",
"Reagent Bottle Clear 125mls",
"Reagent Bottle Clear 250mls",
"Reagent Bottle125mls Amber",
"Real Time PCR System,PRC-Q96",
"Reduce 1/2 to 5/16",
"Regulator",
"Reostant 0-200 Ohms",
"Resistace Box 0-50",
"Resistance Box 0-10 Ohms",
"Resistance Box 0-100",
"Resorcinol 99% Extrapure ( Resorcinol 99% Extrapure )",
"Retort Base",
"Retort Clamp",
"Retort Rod",
"Rheumatoid Factor",
"Rosemary Oil Extrapure ( Rosemary Oil Extrapure )",
"RPR Reagent",
"Rubber Tubing Per Metre",
"Sabouraud Dextrose Broth",
"Safety Google",
"Salicylic Acid 99% Extrapure ( Salicylic Acid 99% Extrapure )",
"Sanitary Vending Machine (AUTOMATIC SANITARY VENDING MACHINE(40 NAPKIN CAP",
"Sanitary Vending Machine( 20-25 (AUTOMATIC SANITARY VENDING MACHINE (20-25 NA",
"Scapel",
"Schott Duran Bottle",
"Schott Duran Bottle 250",
"Schott Duran Bottle 500mls",
"Scouper",
"Semi Circular Block",
"Separating Funnel 1000mls",
"Separating Funnel 250mls",
"Separating Funnel 500mls",
"Sephadex 50gm",
"Shoulder wheel",
"Sieve",
"Silica crucible (Silica Crucible,Height 680mm,Top Dia 445mm, Bottom 225 ,Weight 7...",
"Silica Gel",
"Silica Gel 25kg",
"Silver Nitrate",
"Silver Nitrate Ar",
"Skeleton",
"Slotted Mass 100gX5 Imported",
"Slotted Mass 20gX10 Imported",
"Slotted Mass 50gX10 Imported",
"Slotted Mass10gX10 Imported",
"Small Animal Cage",
"Sodium Acetate",
"Sodium Bicarbonate",
"Sodium Carbonate Anhydrous",
"Sodium Carbonate Deca",
"Sodium Chloride 99.5% Extrapure (Sodium Chloride 99.5% Extrapure)",
"sodium citrate dihydrate",
"Sodium Hydroxide",
"Sodium hypochlorite solution",
"Sodium Lauryl Sulphate Powder 8 (Sodium Lauryl Sulphate Powder 85% Extrapure)",
"Sodium Metabisulphite 96.5% ( Sodium Metabisulphite 96.5% Extrapure )",
"Sodium Metal",
"Sodium Oxalate",
"Sodium PhosphateDibasic Anhydr (Sodium Phosphate Dibasic Anhydrous 98%)",
"Sodium Sulphate Anhydrous 99% E (Sodium Sulphate Anhydrous 99% Extrapure)",
"Sodium Thiosulphate penta (SODIUM THIOSULPHATE penta )",
"Sodium Thiosulphate Anhydrous",
"SodiumPhosphateDibasicAnhy 99% ( Sodium Phosphate Dibasic Anhydrous 99% AR )",
"Softy Body",
"Spatula",
"Specimen Bottle",
"Spiral Spring",
"Spirit Lamp Glass",
"Spotling Tiles",
"Spray Bottle",
"Spring Balance",
"Standard Mass 50g Imported",
"Standard Mass 100g Imported",
"Standard Mass 10g Imported",
"Standard Mass 200g Imported",
"Standard Mass 20g Imported",
"Standard Resistor 1 Ohm",
"Standard Resistor 10ohms",
"Standard Resistor 2 Ohms",
"Standard Resistor 3 Ohms",
"Standard Resistor 4 Ohms",
"Standard Resistor 5 Ohms",
"Standard Resistor 6 Ohms",
"Starch",
"Starch Maize (Corn) Extra Pure (Starch Maize (Corn) Extra Pure)",
"Stationary bicycle",
"Sterile Gloves",
"Stethoscope",
"Stirring Rod",
"Stop Watch Digital",
"Stop Watch Electronic Proffesio",
"Stop Watch Zsd-009 With Compas",
"Student Microscope",
"Succinic Acid /Butanedioic (Succinic Acid 99% For Synthesis)",
"Sucrose Extrapure (Sucrose Extrapure)",
"Sudan iii Powder",
"Sudan iii Solution 500mls",
"Sulphur Powder",
"Sulphuric Acid 98% Extrapure (Sulphuric Acid 98% Extrapure)",
"Sulphuric acide",
"Sunction Catheter # 10",
"Sunction Catheter # 18",
"Superscript III First strand (Superscript III First strand synthesis system for R...",
"Superscript III one step RT_PCR (Superscript III one step RT_PCR with Platinum Ta...",
"Surgical Blades",
"Surgical Gloves",
"Swan neck water tap",
"Syringe 20cc",
"Syringe 50mls",
"Syringe 5mls P/100",
"Syringe Auto Filter P/100",
"Syringes 2cc",
"Syringes 5cc",
"Tannic Acid Powder Extrapure (Tannic Acid Powder Extrapure)",
"Tapping Key Double",
"Tapping Key Single",
"Tartrazine AR For Microscopy (Tartrazine AR For Microscopy)",
"Tee connector 3/4'",
"Tee G.S 3/4",
"Tee Joiint",
"TENS",
"Terpineol Anhydrous 80% Extra P (Terpineol Anhydrous 80% Extra Pure (Mixture of I...",
"Test Tube Rack Plastic",
"Test Tube Brush",
"Test Tube Holder",
"Test Tube Pyrex",
"Test Tube Rack 6 Holes",
"Test tube Soda Glass",
"Therapeutic ultrasound machine",
"Thermometer Alcohol",
"Thermometer Clinical",
"Thistle funnel",
"Thread seal tap",
"Thread Seal Tape",
"Thread tape",
"Thymol Crystal 99% Extrapure",
"Tic Alluminium Plate Silica Gel",
"Tilting table",
"Tissue",
"Tlv Uv Cabinet",
"Toluene 2.5",
"Torniquet",
"Traction bed",
"tri-Potassium Citrate Mono 99% ( tri-Potassium Citrate Monohydrate 99% Extrapure )",
"tri-Sodium Orthophosphate Dodec (tri-Sodium Orthophosphate Dodecahydrate 98% Extr...",
"Tri Sodium Citrate Local Pack",
"Tripod Stand",
"Trough",
"Trough Glass",
"Turpentine Oil Pure (Turpentine Oil Pure)",
"Tween® -20 Extrapure ( Tween® -20 Extrapure (Polyoxyethylene (20) Sorbitan Monola...",
"Tween® -80 Extrapure ( Tween® -80 Extrapure (Polyoxyethylene (20) Sorbitan Monool...",
"Typhoid IGM/IGG",
"U-Shape Magnet 3",
"Universal Bottle 28mls",
"Universal indicator",
"Urea",
"Vacutainer needles",
"Vaseline white (Vaseline white)",
"Venier Caliper",
"Venier Caliper Digital",
"Voltimeter 0-2",
"Voltimeter 0-3",
"Voltimeter 0-5",
"Voltimeter Dual Range 0-3/5V",
"Volumetric Flask 100mls",
"volumetric flask 2000mls",
"Volumetric Flask 500mls",
"Waling Frame",
"Wall Mirroor",
"Wall Mirror",
"Wash Bottle",
"WASH BOTTLEE",
"watch",
"Watch Glass",
"Water bath",
"Water Tap Medium",
"West 1.5",
"Wire Gauze",
"Xylazine Injection",
"Yellow Pippete Tips",
"Yellow Tips",
"Zinc Carbonate Basic Extrapure (Zinc Carbonate Basic Extrapure)",
"Zinc Chloride",
"Zinc Chloride Dry 97% Extrapure (Zinc Chloride Dry 97% Extrapure)",
"Zinc Metal",
"Zinc Nitrate",
"Zinc Oxide 99% Extrapure ( Zinc Oxide 99% Extrapure  )",
"Zinc Stearate Extrapure (Zinc Stearate Extrapure)",
"Zinc Sulphate Heptahydrate 99% (Zinc Sulphate Heptahydrate 99% Extrapure)"
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
