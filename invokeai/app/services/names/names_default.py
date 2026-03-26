from invokeai.app.services.names.names_base import NameServiceBase
from datetime import datetime
import uuid


class SimpleNameService(NameServiceBase):
    """Creates image names with date-based naming."""

    def create_image_name(self) -> str:
        # Format: 2026-03-24-143052-a1b2.png (date-time + short uuid for uniqueness)
        now = datetime.now()
        date_time_str = now.strftime("%Y-%m-%d-%H%M%S")
        short_uuid = uuid.uuid4().hex[:4]  # 4-char suffix for uniqueness
        filename = f"{date_time_str}-{short_uuid}.png"
        return filename
