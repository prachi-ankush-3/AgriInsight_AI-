import json
from pathlib import Path


class TreatmentService:
    def __init__(self, treatments_file: Path):
        self.treatments_file = treatments_file
        self._treatments = self._load_treatments()

    def _load_treatments(self) -> dict[str, dict[str, str]]:
        if not self.treatments_file.exists():
            return {}

        with self.treatments_file.open("r", encoding="utf-8") as file_handle:
            data = json.load(file_handle)

        return {str(key): value for key, value in data.items()}

    def get_treatment_details(self, disease: str) -> dict[str, str]:
        default_details = {
            "medicine": "Consult a local agronomist",
            "organic": "Inspect plants regularly and remove affected leaves",
            "severity": "Unknown",
            "recommendation": "Treatment data is unavailable for this disease. Monitor the plant closely.",
        }

        treatment = self._treatments.get(disease.strip(), default_details)
        recommendation = treatment.get("recommendation") or (
            f"Recommended medicine: {treatment.get('medicine', 'N/A')}. "
            f"Organic option: {treatment.get('organic', 'N/A')}."
        )

        return {
            "medicine": treatment.get("medicine", default_details["medicine"]),
            "organic": treatment.get("organic", default_details["organic"]),
            "severity": treatment.get("severity", default_details["severity"]),
            "recommendation": recommendation,
        }

    def format_treatment_text(self, disease: str) -> str:
        details = self.get_treatment_details(disease)
        return (
            f"{details['recommendation']} "
            f"Medicine: {details['medicine']}. Organic option: {details['organic']}. "
            f"Severity: {details['severity']}."
        )