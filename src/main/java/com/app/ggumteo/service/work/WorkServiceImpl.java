package com.app.ggumteo.service.work;

import com.app.ggumteo.domain.file.FileVO;
import com.app.ggumteo.domain.file.PostFileDTO;
import com.app.ggumteo.domain.post.PostVO;
import com.app.ggumteo.domain.work.WorkDTO;
import com.app.ggumteo.domain.work.WorkVO;
import com.app.ggumteo.pagination.Pagination;
import com.app.ggumteo.repository.post.PostDAO;
import com.app.ggumteo.repository.work.WorkDAO;
import com.app.ggumteo.search.Search;
import com.app.ggumteo.service.file.PostFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class WorkServiceImpl implements WorkService {

    private final WorkDAO workDAO;
    private final PostDAO postDAO;
    private final PostFileService postFileService;  // 파일 저장 서비스 주입

    @Override
    public void write(WorkDTO workDTO, MultipartFile[] workFiles, MultipartFile thumbnailFile) {
        PostVO postVO = new PostVO();
        postVO.setPostTitle(workDTO.getPostTitle());
        postVO.setPostContent(workDTO.getPostContent());
        postVO.setPostType(workDTO.getPostType());
        postVO.setMemberProfileId(workDTO.getMemberProfileId());

        postDAO.save(postVO);
        Long postId = postVO.getId();

        WorkVO workVO = new WorkVO();
        workVO.setId(postId);
        workVO.setWorkPrice(workDTO.getWorkPrice());
        workVO.setGenreType(workDTO.getGenreType());
        workVO.setReadCount(0);
        workVO.setFileContent(workDTO.getFileContent());

        workDAO.save(workVO);
        workDTO.setId(postId);

        // 파일 저장 처리
        if (workFiles != null && workFiles.length > 0) {
            for (MultipartFile file : workFiles) {
                if (!file.isEmpty()) {
                    postFileService.saveFile(file, workDTO.getId());
                }
            }
        }
        // 썸네일 파일 처리
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            FileVO thumbnailFileVO = postFileService.saveFile(thumbnailFile, workDTO.getId());
            workDTO.setThumbnailFileId(thumbnailFileVO.getId()); // FileVO의 ID를 사용하여 설정
            workDAO.updateWork(workDTO); // 썸네일 ID 업데이트
        }
    }


    @Override
    public WorkDTO findWorkById(Long id) {
        return workDAO.findWorkById(id);
    }

    @Override
    public List<WorkDTO> findAllWithThumbnailAndSearch(String genreType, String keyword, Pagination pagination) {
        pagination.progress2();
        return workDAO.findAllWithThumbnailAndSearch(keyword, genreType, pagination);
    }

    @Override
    public void updateWork(WorkDTO workDTO, List<MultipartFile> newFiles, List<Long> deletedFileIds, MultipartFile newThumbnailFile) {
        log.info("업데이트 요청 - 작품 ID: {}", workDTO.getId());
        log.info("삭제할 파일 IDs: {}", deletedFileIds);
        log.info("새로 추가할 파일 수: {}", (newFiles != null ? newFiles.size() : 0));

        // 기존 데이터를 다시 조회하여 최신 정보를 가져옴 (특히 썸네일 파일 ID)
        WorkDTO currentWork = workDAO.findWorkById(workDTO.getId());
        Long currentThumbnailFileId = currentWork.getThumbnailFileId();

        // 썸네일 파일 교체 처리
        if (newThumbnailFile != null && !newThumbnailFile.isEmpty()) {
            // 기존 썸네일 파일의 외래 키 참조 해제
            if (currentThumbnailFileId != null) {
                workDAO.updateThumbnailFileId(workDTO.getId(), null);  // 썸네일 파일 ID를 먼저 null로 설정
                postFileService.deleteFilesByIds(Collections.singletonList(currentThumbnailFileId));
                log.info("기존 썸네일 파일 삭제 완료: 썸네일 파일 ID: {}", currentThumbnailFileId);
            }

            // 새로운 썸네일 파일 저장
            FileVO thumbnailFile = postFileService.saveFile(newThumbnailFile, workDTO.getId());
            workDTO.setThumbnailFileId(thumbnailFile.getId());
            log.info("새로운 썸네일 파일 저장 완료: 썸네일 파일 ID: {}", thumbnailFile.getId());
        } else {
            // 새로운 썸네일 파일이 없을 경우, 기존 썸네일 파일 ID 유지
            workDTO.setThumbnailFileId(currentThumbnailFileId);
            log.info("새로운 썸네일 파일이 없습니다. 기존 썸네일 유지.");
        }

        // 기존 파일 삭제
        if (deletedFileIds != null && !deletedFileIds.isEmpty()) {
            postFileService.deleteFilesByIds(deletedFileIds);
        }

        // 새 파일 추가 (썸네일 파일이 아닌 일반 파일들)
        if (newFiles != null && !newFiles.isEmpty()) {
            for (MultipartFile file : newFiles) {
                if (!file.isEmpty()) {
                    postFileService.saveFile(file, workDTO.getId());
                }
            }
        }

        // 작품 정보 업데이트
        workDAO.updateWork(workDTO);
        log.info("작품 정보 업데이트 완료: 작품 ID {}", workDTO.getId());
    }




    @Override
    public void deleteWorkById(Long id) {
        workDAO.deleteWorkById(id);
        postDAO.deleteById(id);
    }

    @Override
    public void incrementReadCount(Long id) {
        workDAO.incrementReadCount(id);
    }

    @Override
    public int findTotalWorks(String genreType) {
        return workDAO.findTotalWorks(genreType);
    }

    @Override
    public List<PostFileDTO> findFilesByPostId(Long postId) {
        return workDAO.findFilesByPostId(postId);
    }

    @Override
    public int findTotalWithSearch(String genreType, String keyword) {
        return workDAO.findTotalWithSearch(genreType, keyword);
    }

    @Override
    public List<WorkDTO> getThreeWorksByGenre(String genreType, Long workId) {
        return workDAO.findThreeByGenre(genreType, workId);
    }

    @Override
    public List<WorkDTO> getThreeWorksByAuthor(Long memberProfileId, Long workId) {
        return workDAO.findThreeByAuthor(memberProfileId, workId);
    }




}
