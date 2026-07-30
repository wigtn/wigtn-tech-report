import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportHubPage } from "@/components/technical-reports/ReportHubPage";

export const metadata: Metadata = {
  title: "테크 리포트",
  description:
    "WIGTN이 만든 모델과 시스템을 어떻게 설계하고 검증했는지 기록합니다. 측정 결과와 아직 해결하지 못한 문제도 함께 공개합니다.",
  alternates: {
    canonical: `${SITE_URL}/ko/`,
    languages: {
      en: `${SITE_URL}/`,
      ko: `${SITE_URL}/ko/`,
    },
  },
};

export default function KoreanHomePage() {
  return <ReportHubPage locale="ko" />;
}
