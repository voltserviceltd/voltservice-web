import Image from "next/image";

import { SectionHeading } from "@/shared/ui/section-heading";

import { SiteNavbar } from "./components/site-navbar";
import {
  capabilities,
  contactDetails,
  navigation,
  portfolio,
  principles,
  processSteps,
  proofItems,
  signals,
} from "./content";
import styles from "./studio-home.module.css";

export function StudioHome() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <SiteNavbar
        contactEmail={contactDetails.email}
        domain={contactDetails.domain}
        items={navigation}
      />

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>IT Service Management Solution</p>
              <h1 className={styles.heroTitle}>
                A sharper public face for the products and systems we build.
              </h1>
              <p className={styles.heroSummary}>
                Voltservice is the studio behind BuildersHub, PaySmart, and
                VoltPay. This redesign moves the company image onto React and
                Next.js while keeping the engineering discipline you already use
                in product work: clear boundaries, readable structure, and
                release confidence.
              </p>

              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#products">
                  Review the Work
                </a>
                <a
                  className={styles.secondaryAction}
                  href={`mailto:${contactDetails.email}`}
                >
                  Start a Project
                </a>
              </div>

              <ul className={styles.signalList}>
                {signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </div>

            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.heroAura} />
              <Image
                alt=""
                className={styles.heroTeam}
                height={512}
                priority
                src="/brand/team.png"
                width={512}
              />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={styles.sectionInner}>
            <SectionHeading
              description="The redesigned company image should communicate product maturity, framework modernity, and engineering discipline without sounding like a generic agency deck."
              eyebrow="Why This Direction"
              title="The company story needs proof, not volume."
            />

            <div className={styles.proofGrid}>
              {proofItems.map((item) => (
                <article className={styles.proofItem} key={item.label}>
                  <p className={styles.proofLabel}>{item.label}</p>
                  <p className={styles.proofValue}>{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="products">
          <div className={styles.sectionInner}>
            <SectionHeading
              description="Voltservice reads strongest when the company is framed through the products and systems it has actually shaped. These are the proof points the site should lead with."
              eyebrow="Product Proof"
              title="Recent product work"
            />

            <div className={styles.productGrid}>
              {portfolio.map((item) => (
                <article className={styles.productCard} key={item.name}>
                  <div className={styles.productImageWrap}>
                    <Image
                      alt={item.imageAlt}
                      className={styles.productImage}
                      height={960}
                      src={item.image}
                      width={960}
                    />
                  </div>

                  <div className={styles.productBody}>
                    <p className={styles.productCategory}>{item.category}</p>
                    <h3 className={styles.productName}>{item.name}</h3>
                    <p className={styles.productSummary}>{item.summary}</p>
                    <p className={styles.productDetail}>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAccent}`} id="services">
          <div className={styles.sectionInner}>
            <SectionHeading
              description="This is where the company image meets the framework decision. React and Next.js become the foundation for a more standard, extensible public surface without losing product rigor."
              eyebrow="Services"
              title="Where React and Next.js fit the studio"
            />

            <div className={styles.servicesGrid}>
              {capabilities.map((item) => (
                <article className={styles.serviceCard} key={item.title}>
                  <h3 className={styles.serviceTitle}>{item.title}</h3>
                  <p className={styles.serviceSummary}>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="principles">
          <div className={styles.sectionInner}>
            <SectionHeading
              description="The transferable part of the BuildersHub discipline is not the mobile stack. It is the way boundaries, docs, and quality checks are treated as part of delivery."
              eyebrow="Discipline"
              title="The engineering bar stays visible"
            />

            <div className={styles.principlesGrid}>
              {principles.map((item) => (
                <article className={styles.principleCard} key={item.title}>
                  <h3 className={styles.principleTitle}>{item.title}</h3>
                  <p className={styles.principleSummary}>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionDark}`}
          id="approach"
        >
          <div className={styles.sectionInner}>
            <div className={styles.approachLayout}>
              <div className={styles.approachCopy}>
                <SectionHeading
                  description="A redesign should improve the message and the repo at the same time. The result is easier to maintain, easier to extend, and easier to trust."
                  eyebrow="Approach"
                  title="How the redesign should be delivered"
                />

                <div className={styles.processGrid}>
                  {processSteps.map((step, index) => (
                    <article className={styles.processCard} key={step.title}>
                      <p className={styles.processIndex}>
                        0{index + 1}
                      </p>
                      <h3 className={styles.processTitle}>{step.title}</h3>
                      <p className={styles.processSummary}>{step.summary}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className={styles.approachVisual}>
                <div className={styles.approachImageWrap}>
                  <Image
                    alt="Illustration of a software delivery partnership."
                    className={styles.approachImage}
                    height={768}
                    src="/brand/partner-image.png"
                    width={768}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionDark}`}
          id="contact"
        >
          <div className={styles.sectionInner}>
            <div className={styles.contactBand}>
              <div className={styles.contactCopy}>
                <p className={styles.contactEyebrow}>Contact</p>
                <h2 className={styles.contactTitle}>
                  Need a stronger company image without lowering the engineering
                  bar?
                </h2>
                <p className={styles.contactSummary}>
                  {contactDetails.strapline}
                </p>

                <ul className={styles.contactList}>
                  <li>Company-site redesigns that read like real product work.</li>
                  <li>Focused support for web platforms, cloud systems, and QA.</li>
                  <li>Clearer narrative for internal products and partner delivery.</li>
                </ul>
              </div>

              <div className={styles.contactMeta}>
                <a
                  className={styles.contactEmail}
                  href={`mailto:${contactDetails.email}`}
                >
                  {contactDetails.email}
                </a>
                <p className={styles.contactSummary}>
                  For project enquiries, product cleanup, or a fresh public
                  repositioning.
                </p>
                <a
                  className={styles.contactAction}
                  href={`mailto:${contactDetails.email}`}
                >
                  Start a Project
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerTitle}>VOLTSERVICE LTD</p>
            <p className={styles.footerText}>
              Modern digital products for web, cloud, and high-trust systems.
            </p>
          </div>

          <p className={styles.footerText}>{contactDetails.domain}</p>
        </div>
      </footer>
    </div>
  );
}
