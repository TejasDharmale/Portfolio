import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { getRecommendations } from "@/lib/content";

export default async function RecommendationsPage() {
  const recommendations = await getRecommendations();

  return (
    <>
      <PageIntro
        eyebrow="Recommendations"
        title="Received recommendations"
        description="Recommend Srushti | Received | Given"
      />

      <section className="reco-card reveal delay-1">
        {recommendations.map((rec) => (
          <div key={rec.recommender}>
            <div className="panel">
              <div className="reco-head">
                <Image
                  src={rec.image}
                  alt={rec.recommender}
                  width={74}
                  height={74}
                  className="avatar"
                />
                <div>
                  <h3>{rec.recommender}</h3>
                  <p className="muted">{rec.title}</p>
                  <p className="muted">1st</p>
                </div>
              </div>
              <p className="muted" style={{ marginTop: "0.8rem" }}>
                {rec.relationship}
              </p>
            </div>

            <article className="panel">
              <h3>Recommendation</h3>
              <p className="muted">{rec.body}</p>
              <p>{rec.note}</p>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
