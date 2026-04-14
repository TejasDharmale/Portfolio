import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { recommendation } from "@/lib/data";
import recommendationPersonImage from "../assest/image.png";

export default function RecommendationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Recommendations"
        title="Received recommendation"
        description="Recommend Srushti | Received (1) | Given"
      />

      <section className="reco-card reveal delay-1">
        <div className="panel">
          <div className="reco-head">
            <Image
              src={recommendationPersonImage}
              alt={recommendation.recommender}
              width={74}
              height={74}
              className="avatar"
            />
            <div>
              <h3>{recommendation.recommender}</h3>
              <p className="muted">{recommendation.title}</p>
              <p className="muted">1st</p>
            </div>
          </div>
          <p className="muted" style={{ marginTop: "0.8rem" }}>
            {recommendation.relationship}
          </p>
        </div>

        <article className="panel">
          <h3>Recommendation</h3>
          <p className="muted">{recommendation.body}</p>
          <p>{recommendation.note}</p>
        </article>
      </section>
    </>
  );
}
