-- The Hearth Mastery - Database Schema Draft v1
-- Purpose: structure the learning content and prepare for future student sync.

CREATE TABLE users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE student_profiles (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(120) NOT NULL,
  current_node_slug VARCHAR(80) NULL,
  current_level_slug VARCHAR(80) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_student_profiles_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_student_profiles_user (user_id)
);

CREATE TABLE app_nodes (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  metaphor VARCHAR(160) NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE app_node_map_anchors (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  app_node_id BIGINT UNSIGNED NULL,
  anchor_slug VARCHAR(120) NOT NULL UNIQUE,
  prototype_data_node VARCHAR(120) NULL,
  svg_element_id VARCHAR(180) NULL,
  icon_key VARCHAR(120) NULL,
  icon_file VARCHAR(255) NULL,
  position_x DECIMAL(8,3) NULL,
  position_y DECIMAL(8,3) NULL,
  ring_radius DECIMAL(8,3) NULL,
  touch_radius DECIMAL(8,3) NULL,
  image_x DECIMAL(8,3) NULL,
  image_y DECIMAL(8,3) NULL,
  image_width DECIMAL(8,3) NULL,
  image_height DECIMAL(8,3) NULL,
  clip_path_id VARCHAR(180) NULL,
  ring VARCHAR(80) NULL,
  visual_role VARCHAR(80) NOT NULL DEFAULT 'node',
  default_locked TINYINT(1) NOT NULL DEFAULT 0,
  unlock_rule_key VARCHAR(120) NULL,
  action_key VARCHAR(120) NULL,
  tooltip_tag VARCHAR(120) NULL,
  route_path VARCHAR(180) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_app_node_map_anchors_node FOREIGN KEY (app_node_id) REFERENCES app_nodes(id),
  INDEX idx_app_node_map_anchors_node (app_node_id),
  INDEX idx_app_node_map_anchors_data_node (prototype_data_node),
  INDEX idx_app_node_map_anchors_visual_role (visual_role),
  INDEX idx_app_node_map_anchors_unlock_rule (unlock_rule_key),
  INDEX idx_app_node_map_anchors_action (action_key)
);

CREATE TABLE app_node_connections (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  from_node_id BIGINT UNSIGNED NOT NULL,
  to_node_id BIGINT UNSIGNED NOT NULL,
  connection_type VARCHAR(80) NOT NULL DEFAULT 'related',
  svg_element_id VARCHAR(180) NULL,
  svg_element_type VARCHAR(40) NOT NULL DEFAULT 'line',
  css_class VARCHAR(180) NULL,
  data_path VARCHAR(120) NULL,
  x1 DECIMAL(8,3) NULL,
  y1 DECIMAL(8,3) NULL,
  x2 DECIMAL(8,3) NULL,
  y2 DECIMAL(8,3) NULL,
  path_d TEXT NULL,
  stroke_width VARCHAR(40) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_app_node_connections_from FOREIGN KEY (from_node_id) REFERENCES app_nodes(id),
  CONSTRAINT fk_app_node_connections_to FOREIGN KEY (to_node_id) REFERENCES app_nodes(id),
  UNIQUE KEY uniq_app_node_connection (from_node_id, to_node_id, connection_type),
  INDEX idx_app_node_connections_from (from_node_id),
  INDEX idx_app_node_connections_to (to_node_id),
  INDEX idx_app_node_connections_type (connection_type),
  INDEX idx_app_node_connections_data_path (data_path)
);

CREATE TABLE skill_nodes (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE learning_disciplines (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  skill_node_id BIGINT UNSIGNED NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_learning_disciplines_skill_node FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id),
  INDEX idx_learning_disciplines_skill_node (skill_node_id)
);

CREATE TABLE mastery_levels (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roadmap_items (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  phase INT NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  app_metaphor VARCHAR(180) NULL,
  app_node_id BIGINT UNSIGNED NULL,
  skill_node_id BIGINT UNSIGNED NULL,
  learning_discipline_id BIGINT UNSIGNED NULL,
  mastery_level_id BIGINT UNSIGNED NULL,
  learning_objective TEXT NOT NULL,
  key_concepts JSON NULL,
  practice_tasks JSON NULL,
  pass_conditions JSON NULL,
  song_applications JSON NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Not Started',
  priority VARCHAR(40) NOT NULL DEFAULT 'Medium',
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_roadmap_app_node FOREIGN KEY (app_node_id) REFERENCES app_nodes(id),
  CONSTRAINT fk_roadmap_skill_node FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id),
  CONSTRAINT fk_roadmap_learning_discipline FOREIGN KEY (learning_discipline_id) REFERENCES learning_disciplines(id),
  CONSTRAINT fk_roadmap_mastery_level FOREIGN KEY (mastery_level_id) REFERENCES mastery_levels(id),
  INDEX idx_roadmap_phase (phase),
  INDEX idx_roadmap_skill_node (skill_node_id),
  INDEX idx_roadmap_learning_discipline (learning_discipline_id),
  INDEX idx_roadmap_mastery_level (mastery_level_id),
  INDEX idx_roadmap_status (status),
  INDEX idx_roadmap_priority (priority)
);

CREATE TABLE resources (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(160) NOT NULL UNIQUE,
  resource_name VARCHAR(255) NOT NULL,
  creator_platform VARCHAR(255) NULL,
  resource_type VARCHAR(80) NOT NULL,
  skill_node_id BIGINT UNSIGNED NULL,
  mastery_level_id BIGINT UNSIGNED NULL,
  url TEXT NOT NULL,
  backup_url TEXT NULL,
  why_useful TEXT NULL,
  best_for VARCHAR(160) NULL,
  quality_notes TEXT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'To Review',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_resources_skill_node FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id),
  CONSTRAINT fk_resources_mastery_level FOREIGN KEY (mastery_level_id) REFERENCES mastery_levels(id),
  INDEX idx_resources_type (resource_type),
  INDEX idx_resources_status (status)
);

CREATE TABLE media_assets (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  asset_type VARCHAR(80) NOT NULL,
  url TEXT NOT NULL,
  local_file_location TEXT NULL,
  source_name VARCHAR(255) NULL,
  source_url TEXT NULL,
  rights_status VARCHAR(80) NOT NULL DEFAULT 'unknown',
  app_node_id BIGINT UNSIGNED NULL,
  skill_node_id BIGINT UNSIGNED NULL,
  learning_discipline_id BIGINT UNSIGNED NULL,
  mastery_level_id BIGINT UNSIGNED NULL,
  concept VARCHAR(180) NULL,
  usage_purpose TEXT NULL,
  citation_text TEXT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'To Review',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_media_assets_app_node FOREIGN KEY (app_node_id) REFERENCES app_nodes(id),
  CONSTRAINT fk_media_assets_skill_node FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id),
  CONSTRAINT fk_media_assets_learning_discipline FOREIGN KEY (learning_discipline_id) REFERENCES learning_disciplines(id),
  CONSTRAINT fk_media_assets_mastery_level FOREIGN KEY (mastery_level_id) REFERENCES mastery_levels(id),
  INDEX idx_media_assets_type (asset_type),
  INDEX idx_media_assets_status (status),
  INDEX idx_media_assets_concept (concept)
);

CREATE TABLE roadmap_resources (
  roadmap_item_id BIGINT UNSIGNED NOT NULL,
  resource_id BIGINT UNSIGNED NOT NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'supporting',
  PRIMARY KEY (roadmap_item_id, resource_id),
  CONSTRAINT fk_roadmap_resources_item FOREIGN KEY (roadmap_item_id) REFERENCES roadmap_items(id),
  CONSTRAINT fk_roadmap_resources_resource FOREIGN KEY (resource_id) REFERENCES resources(id)
);

CREATE TABLE book_sources (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  content_book_key_name VARCHAR(180) NULL UNIQUE,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NULL,
  publisher VARCHAR(255) NULL,
  publication_year INT NULL,
  format VARCHAR(40) NOT NULL DEFAULT 'PDF',
  file_location TEXT NULL,
  pdf_url TEXT NULL,
  text_quality VARCHAR(40) NOT NULL DEFAULT 'unknown',
  topic_category VARCHAR(120) NULL,
  difficulty VARCHAR(80) NULL,
  skill_nodes_json JSON NULL,
  level_range VARCHAR(120) NULL,
  public_reference_allowed TINYINT(1) NOT NULL DEFAULT 1,
  private_library_openable TINYINT(1) NOT NULL DEFAULT 0,
  citation_text TEXT NULL,
  source_role VARCHAR(120) NULL,
  source_status VARCHAR(80) NOT NULL DEFAULT 'To Review',
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_book_sources_topic (topic_category),
  INDEX idx_book_sources_text_quality (text_quality),
  INDEX idx_book_sources_status (source_status)
);

CREATE TABLE book_files (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  book_source_id BIGINT UNSIGNED NOT NULL,
  inventory_id VARCHAR(80) NULL,
  local_file_location VARCHAR(1024) NULL,
  hosted_url TEXT NULL,
  format VARCHAR(40) NOT NULL DEFAULT 'PDF',
  file_size_mb DECIMAL(10,2) NULL,
  page_count VARCHAR(40) NULL,
  text_quality VARCHAR(80) NOT NULL DEFAULT 'unknown',
  canonical_copy TINYINT(1) NOT NULL DEFAULT 0,
  file_status VARCHAR(80) NOT NULL DEFAULT 'To Review',
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_book_files_book FOREIGN KEY (book_source_id) REFERENCES book_sources(id),
  INDEX idx_book_files_book (book_source_id),
  INDEX idx_book_files_canonical (canonical_copy),
  INDEX idx_book_files_status (file_status),
  INDEX idx_book_files_inventory (inventory_id)
);

CREATE TABLE book_sections (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  book_source_id BIGINT UNSIGNED NOT NULL,
  parent_section_id BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  title VARCHAR(255) NOT NULL,
  page_start INT NULL,
  page_end INT NULL,
  summary TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_book_sections_book FOREIGN KEY (book_source_id) REFERENCES book_sources(id),
  CONSTRAINT fk_book_sections_parent FOREIGN KEY (parent_section_id) REFERENCES book_sections(id),
  INDEX idx_book_sections_book_order (book_source_id, sort_order)
);

CREATE TABLE source_notes (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  book_source_id BIGINT UNSIGNED NOT NULL,
  book_section_id BIGINT UNSIGNED NULL,
  roadmap_item_id BIGINT UNSIGNED NULL,
  teaching_lesson_id BIGINT UNSIGNED NULL,
  concept VARCHAR(180) NOT NULL,
  printed_page_start INT NULL,
  printed_page_end INT NULL,
  pdf_page_start INT NULL,
  pdf_page_end INT NULL,
  page_reference VARCHAR(80) NULL,
  extraction_quality VARCHAR(80) NULL,
  source_summary TEXT NOT NULL,
  hearth_application TEXT NULL,
  citation_note TEXT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'To Process',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_source_notes_book FOREIGN KEY (book_source_id) REFERENCES book_sources(id),
  CONSTRAINT fk_source_notes_section FOREIGN KEY (book_section_id) REFERENCES book_sections(id),
  CONSTRAINT fk_source_notes_roadmap FOREIGN KEY (roadmap_item_id) REFERENCES roadmap_items(id),
  CONSTRAINT fk_source_notes_lesson FOREIGN KEY (teaching_lesson_id) REFERENCES teaching_lessons(id),
  INDEX idx_source_notes_concept (concept),
  INDEX idx_source_notes_status (status)
);

CREATE TABLE songs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NULL,
  style VARCHAR(120) NULL,
  song_key VARCHAR(40) NULL,
  chords_used TEXT NULL,
  techniques_used TEXT NULL,
  roadmap_fit VARCHAR(180) NULL,
  difficulty VARCHAR(80) NULL,
  youtube_tutorial TEXT NULL,
  chart_url TEXT NULL,
  status VARCHAR(80) NOT NULL DEFAULT 'Wishlist',
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_songs_status (status),
  INDEX idx_songs_difficulty (difficulty)
);

CREATE TABLE teaching_lessons (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(160) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NULL,
  app_node_id BIGINT UNSIGNED NULL,
  roadmap_item_id BIGINT UNSIGNED NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_teaching_lessons_app_node FOREIGN KEY (app_node_id) REFERENCES app_nodes(id),
  CONSTRAINT fk_teaching_lessons_roadmap FOREIGN KEY (roadmap_item_id) REFERENCES roadmap_items(id)
);

CREATE TABLE teaching_steps (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  lesson_id BIGINT UNSIGNED NOT NULL,
  sort_order INT NOT NULL,
  step_type VARCHAR(40) NOT NULL,
  concept VARCHAR(120) NULL,
  character_image VARCHAR(255) NULL,
  character_label VARCHAR(120) NULL,
  content_json JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_teaching_steps_lesson FOREIGN KEY (lesson_id) REFERENCES teaching_lessons(id),
  UNIQUE KEY uq_teaching_steps_order (lesson_id, sort_order),
  INDEX idx_teaching_steps_type (step_type)
);

CREATE TABLE create_obstructions (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  level INT NOT NULL,
  category VARCHAR(80) NOT NULL,
  constraint_text TEXT NOT NULL,
  prompt TEXT NOT NULL,
  payoff TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_obstructions_level (level),
  INDEX idx_obstructions_category (category)
);

CREATE TABLE create_combos (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  level INT NOT NULL,
  ingredients JSON NOT NULL,
  constraint_text TEXT NOT NULL,
  prompt TEXT NOT NULL,
  payoff TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_combos_level (level)
);

CREATE TABLE practice_sessions (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  student_profile_id BIGINT UNSIGNED NOT NULL,
  practiced_on DATE NOT NULL,
  minutes INT NULL,
  skill_node_id BIGINT UNSIGNED NULL,
  roadmap_item_id BIGINT UNSIGNED NULL,
  exercise_or_song VARCHAR(255) NULL,
  tempo_bpm INT NULL,
  confidence_rating TINYINT NULL,
  difficulty_rating TINYINT NULL,
  notes TEXT NULL,
  next_action TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_practice_student FOREIGN KEY (student_profile_id) REFERENCES student_profiles(id),
  CONSTRAINT fk_practice_skill_node FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id),
  CONSTRAINT fk_practice_roadmap FOREIGN KEY (roadmap_item_id) REFERENCES roadmap_items(id),
  INDEX idx_practice_student_date (student_profile_id, practiced_on)
);

CREATE TABLE practice_drills (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(160) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  app_node_id BIGINT UNSIGNED NULL,
  skill_node_id BIGINT UNSIGNED NULL,
  learning_discipline_id BIGINT UNSIGNED NULL,
  mastery_level_id BIGINT UNSIGNED NULL,
  technique_category VARCHAR(120) NULL,
  style_context VARCHAR(120) NULL,
  description TEXT NOT NULL,
  physical_tip TEXT NULL,
  tempo_min INT NULL,
  tempo_max INT NULL,
  duration_minutes INT NULL,
  pass_condition TEXT NULL,
  reflection_prompt TEXT NULL,
  source_note_id BIGINT UNSIGNED NULL,
  source_citation TEXT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_practice_drills_app_node FOREIGN KEY (app_node_id) REFERENCES app_nodes(id),
  CONSTRAINT fk_practice_drills_skill_node FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id),
  CONSTRAINT fk_practice_drills_learning_discipline FOREIGN KEY (learning_discipline_id) REFERENCES learning_disciplines(id),
  CONSTRAINT fk_practice_drills_mastery_level FOREIGN KEY (mastery_level_id) REFERENCES mastery_levels(id),
  CONSTRAINT fk_practice_drills_source_note FOREIGN KEY (source_note_id) REFERENCES source_notes(id),
  INDEX idx_practice_drills_discipline (learning_discipline_id),
  INDEX idx_practice_drills_level (mastery_level_id),
  INDEX idx_practice_drills_status (status)
);

CREATE TABLE progress_records (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  student_profile_id BIGINT UNSIGNED NOT NULL,
  roadmap_item_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'Not Started',
  confidence_rating TINYINT NULL,
  completed_at TIMESTAMP NULL,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_progress_student FOREIGN KEY (student_profile_id) REFERENCES student_profiles(id),
  CONSTRAINT fk_progress_roadmap FOREIGN KEY (roadmap_item_id) REFERENCES roadmap_items(id),
  UNIQUE KEY uq_progress_student_roadmap (student_profile_id, roadmap_item_id),
  INDEX idx_progress_status (status)
);

CREATE TABLE lesson_attempts (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  student_profile_id BIGINT UNSIGNED NOT NULL,
  teaching_lesson_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'In Progress',
  scores_json JSON NULL,
  reflection TEXT NULL,
  started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  CONSTRAINT fk_attempt_student FOREIGN KEY (student_profile_id) REFERENCES student_profiles(id),
  CONSTRAINT fk_attempt_lesson FOREIGN KEY (teaching_lesson_id) REFERENCES teaching_lessons(id),
  INDEX idx_attempt_student_lesson (student_profile_id, teaching_lesson_id)
);
